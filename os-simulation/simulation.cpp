
#include <iostream>
#include <string>
#include <vector>
#include <queue>
#include <map>
#include <thread>
#include <mutex>
#include <condition_variable>
#include <semaphore>
#include <atomic>
#include <chrono>
#include <iomanip>

using namespace std;

// ============================================
// CONFIGURATION
// ============================================

const int WORKER_COUNT = 3;

// Maximum two workers can allocate inventory
// simultaneously.

counting_semaphore<2> inventorySemaphore(2);

// ============================================
// EMERGENCY REQUEST STRUCTURE
// ============================================

struct EmergencyRequest {

    int id;
    string hospital;
    string bloodGroup;
    int units;
    string urgency;
    int arrivalOrder;
};

// ============================================
// PRIORITY SCHEDULING
// ============================================

int getPriority(const string& urgency) {

    if (urgency == "critical")
        return 3;

    if (urgency == "urgent")
        return 2;

    return 1;
}

struct CompareRequest {

    bool operator()(
        const EmergencyRequest& a,
        const EmergencyRequest& b
    ) const {

        int p1 = getPriority(a.urgency);
        int p2 = getPriority(b.urgency);

        // Higher urgency gets higher priority.

        if (p1 != p2)
            return p1 < p2;

        // FCFS for requests with equal priority.

        return a.arrivalOrder > b.arrivalOrder;
    }
};

// ============================================
// SHARED REQUEST QUEUE
// ============================================

priority_queue<
    EmergencyRequest,
    vector<EmergencyRequest>,
    CompareRequest
> requestQueue;

mutex queueMutex;

condition_variable queueCondition;

bool producerFinished = false;

// ============================================
// SHARED INVENTORY
// ============================================

map<string, int> bloodInventory = {

    {"A+", 5},
    {"A-", 3},

    {"B+", 4},
    {"B-", 2},

    {"AB+", 3},
    {"AB-", 0},

    {"O+", 5},
    {"O-", 2}
};

mutex inventoryMutex;

// ============================================
// OUTPUT SYNCHRONIZATION
// ============================================

mutex outputMutex;

// ============================================
// SIMULATION STATISTICS
// ============================================

atomic<int> totalProcessed(0);

atomic<int> totalFulfilled(0);

atomic<int> totalPending(0);

atomic<int> totalFailed(0);

// ============================================
// BLOOD COMPATIBILITY
// ============================================

// Compatible red blood cell donor groups.

map<string, vector<string>> compatibility = {

    {"O-",  {"O-"}},

    {"O+",  {"O-", "O+"}},

    {"A-",  {"O-", "A-"}},

    {"A+",  {"O-", "O+", "A-", "A+"}},

    {"B-",  {"O-", "B-"}},

    {"B+",  {"O-", "O+", "B-", "B+"}},

    {"AB-", {"O-", "A-", "B-", "AB-"}},

    {"AB+", {"O-", "O+", "A-", "A+",
             "B-", "B+", "AB-", "AB+"}}
};

// ============================================
// DISPLAY INVENTORY
// ============================================

void displayInventory() {

    lock_guard<mutex> lock(inventoryMutex);

    cout << "\n========== BLOOD INVENTORY ==========\n";

    for (const auto& item : bloodInventory) {

        cout << left << setw(8)
             << item.first
             << " Available Units: "
             << item.second << endl;
    }

    cout << "=====================================\n";
}

// ============================================
// ADD REQUEST TO QUEUE
// ============================================

void addRequest(const EmergencyRequest& request) {

    {
        lock_guard<mutex> lock(queueMutex);

        requestQueue.push(request);
    }

    queueCondition.notify_one();

    lock_guard<mutex> lock(outputMutex);

    cout << "\nNew emergency request received: "
         << request.id << endl;

    cout << "Hospital: "
         << request.hospital << endl;

    cout << "Blood Group: "
         << request.bloodGroup << endl;

    cout << "Urgency: "
         << request.urgency << endl;
}

// ============================================
// PRODUCER FUNCTION
// ============================================

void producer() {

    cout << "\n[PRODUCER] Generating emergency requests...\n";

    vector<EmergencyRequest> requests = {

        {101, "City Care Hospital", "AB-", 3, "critical", 1},

        {102, "Max Hospital", "O+", 2, "urgent", 2},

        {103, "Apollo Hospital", "A+", 2, "normal", 3},

        {104, "Fortis Hospital", "B+", 3, "critical", 4},

        {105, "City Care Hospital", "O-", 2, "urgent", 5},

        {106, "Max Hospital", "AB+", 4, "normal", 6}

    };

    for (const auto& request : requests) {

        addRequest(request);

        this_thread::sleep_for(
            chrono::milliseconds(300)
        );
    }

    {
        lock_guard<mutex> lock(queueMutex);

        producerFinished = true;
    }

    queueCondition.notify_all();

    {
        lock_guard<mutex> lock(outputMutex);

        cout << "\n[PRODUCER] All requests generated.\n";
    }
}

// ============================================
// INVENTORY ALLOCATION
// ============================================

bool allocateBlood(
    const EmergencyRequest& request
) {

    // Limit simultaneous inventory allocation.

    inventorySemaphore.acquire();

    bool allocated = false;

    {
        // Protect shared inventory.

        lock_guard<mutex> lock(inventoryMutex);

        vector<string> donors =
            compatibility[request.bloodGroup];

        int remainingUnits = request.units;

        vector<pair<string, int>> allocationPlan;

        // First check whether enough compatible
        // stock exists in total.

        for (const string& group : donors) {

            int available = bloodInventory[group];

            int quantity = min(
                available,
                remainingUnits
            );

            if (quantity > 0) {

                allocationPlan.push_back(
                    {group, quantity}
                );

                remainingUnits -= quantity;
            }

            if (remainingUnits == 0)
                break;
        }

        // Allocate only if the complete request
        // can be fulfilled.

        if (remainingUnits == 0) {

            for (const auto& item : allocationPlan) {

                bloodInventory[item.first] -= item.second;
            }

            allocated = true;
        }
    }

    inventorySemaphore.release();

    return allocated;
}

// ============================================
// PROCESS EMERGENCY REQUEST
// ============================================

void processRequest(
    const EmergencyRequest& request,
    int workerID
) {

    {
        lock_guard<mutex> lock(outputMutex);

        cout << "\n-------------------------------------\n";

        cout << "Worker " << workerID
             << " processing Request "
             << request.id << endl;

        cout << "Hospital: "
             << request.hospital << endl;

        cout << "Blood Group: "
             << request.bloodGroup << endl;

        cout << "Required Units: "
             << request.units << endl;

        cout << "Urgency: "
             << request.urgency << endl;

        cout << "-------------------------------------\n";
    }

    // Simulate processing time.

    this_thread::sleep_for(
        chrono::milliseconds(1000)
    );

    bool success = allocateBlood(request);

    totalProcessed++;

    {
        lock_guard<mutex> lock(outputMutex);

        if (success) {

            totalFulfilled++;

            cout << "\n[WORKER " << workerID
                 << "] REQUEST FULFILLED\n";

            cout << "Request ID: "
                 << request.id << endl;
        }

        else {

            totalPending++;

            cout << "\n[WORKER " << workerID
                 << "] INSUFFICIENT BLOOD STOCK\n";

            cout << "Request ID: "
                 << request.id << endl;

            cout << "Request remains pending.\n";
        }
    }
}

// ============================================
// WORKER THREAD
// ============================================

void worker(int workerID) {

    {
        lock_guard<mutex> lock(outputMutex);

        cout << "\nWorker " << workerID
             << " started.\n";
    }

    while (true) {

        EmergencyRequest request;

        {
            unique_lock<mutex> lock(queueMutex);

            // Wait until a request arrives or
            // the producer finishes.

            queueCondition.wait(
                lock,
                [] {

                    return !requestQueue.empty()
                        || producerFinished;

                }
            );

            if (requestQueue.empty() &&
                producerFinished) {

                break;
            }

            // Retrieve highest-priority request.

            request = requestQueue.top();

            requestQueue.pop();
        }

        // Process outside the queue lock.

        processRequest(request, workerID);
    }

    {
        lock_guard<mutex> lock(outputMutex);

        cout << "\nWorker " << workerID
             << " finished.\n";
    }
}

// ============================================
// FINAL SIMULATION REPORT
// ============================================

void displaySummary() {

    cout << "\n\n========================================\n";

    cout << "       LIFELINK OS SIMULATION REPORT\n";

    cout << "========================================\n";

    cout << "Total Requests Processed: "
         << totalProcessed << endl;

    cout << "Successfully Fulfilled: "
         << totalFulfilled << endl;

    cout << "Insufficient Stock: "
         << totalPending << endl;

    cout << "Failed Requests: "
         << totalFailed << endl;

    cout << "========================================\n";

    displayInventory();
}

// ============================================
// MAIN FUNCTION
// ============================================

int main() {

    cout << "\n========================================\n";

    cout << "          LIFELINK OS SIMULATION\n";

    cout << "========================================\n";

    cout << "\nOS Concepts Implemented:\n";

    cout << "1. Priority Scheduling\n";

    cout << "2. Multithreading\n";

    cout << "3. Mutex Synchronization\n";

    cout << "4. Semaphore Management\n";

    cout << "5. Producer-Consumer Problem\n";

    cout << "6. Condition Variables\n";

    cout << "7. Race Condition Prevention\n";

    cout << "8. Resource Allocation\n";

    cout << "========================================\n";

    displayInventory();

    // Create worker threads.

    thread worker1(worker, 1);

    thread worker2(worker, 2);

    thread worker3(worker, 3);

    // Generate requests.

    thread producerThread(producer);

    // Wait for producer.

    producerThread.join();

    // Wait for all workers.

    worker1.join();

    worker2.join();

    worker3.join();

    // Display final report.

    displaySummary();

    cout << "\nOS Simulation Completed Successfully!\n";

    return 0;
}
