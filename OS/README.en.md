# Part 1-4 Operating System

* [Process vs Thread](#process-vs-thread)
* [Multi-thread](#multi-thread)
  * Pros and cons
  * Multi-thread vs Multi-process
* [Scheduler](#scheduler)
  * Long-term scheduler
  * Short-term scheduler
  * Medium-term scheduler
* [CPU scheduler](#cpu-scheduler)
  * FCFS
  * SJF
  * SRTF
  * Priority scheduling
  * RR
* [Synchronous vs Asynchronous](#synchronous-vs-ayschrnous)
* [Process synchronization](#process-synchronization)
  * Critical Section
  * Solution
    * Lock
    * Semaphores
    * Monitoring
* [Memory management strategy](#memory-management-strategy)
  * Background of memory management
  * Paging
  * Segmentation
* [Virtual memory](#virtual-memory)
  * Background
  * Virtual memory usahge
  * Demand Paging (요구 페이징)
  * Page replacement algorithm
* [Locality of Cache](#locality-of-cache)
  * Locality
  * Caching line

[Back](https://github.com/JaeYeopHan/for_beginner)

</br>

---

## Process vs Thread

### Process

The process is an instance of a program in excecution, which can be loaded into memory from a disk and receive CPU allocation. Address space, files, memory, etc. are allocated by the operating system, and collectively referred to as a process. A process includes a stack with temporary data such as function parameters, return addresses, and local variables, and a data section containing global variables. A process also includes heap, dynamically allocated memory during its execution.

#### Process Control Block (PCB)

The PCB is a data structure of the operating system that **stores important information about a particular process**. When a process is created, the operating system **simultaneously creates a unique PCB** to manage the process. While a process is handling its operations on the CPU, if a process switching occurs, the process must save the ongoing work and yields the CPU. The progress status is saved in the PCB. Then, when the process regain CPU allocation, it can recall the stored status in the PCB and continue where it left off.

_Information store by PCB_

* Process ID (PID): process identification number
* Process status: the status of the process such as new, ready, running, waiting, terminated.
* Program counter: Address of the next instruction to be executed by the process.
* CPU scheduling information: priority of process, pointer to schedule queue, etc.
* Memory management information: page table, segment table, etc.
* IO status information : IO devices assigned to the process, list of open files, ...
* Bookkeeping information: consumed CPU time, time limit, account number, etc.

</br>

### Thread

The thread is an execution unit of the process. Within a process, several execution flows could share address spaces or resources.
The thread consists of a thread ID, a program counter, a register set, and a stack. Each thread shares operating system resources such as code section, data section, and open files or signals with other threads belonging to the same process.
Multi-threading is the division of one process into multiple execution units, which share resources and minimize redundancy in resource creation and management to improve performance. In this case, each thread has its own stack and PC register values because it has to perform independent tasks.

#### Why each thread has its own independent thread 

Stack is a memory space storing the function parameters, return addresses and locally declared variables. If the stack memory space is independent, function can be called independently, which adds an independent execution flow. Therefore, according to the definition of the thread, to add an independent execution flow, an independent stack is allocated for each thread as a minimum condition.

#### Why each thread has its own PC register

The PC value indicates the next instruction to be executed by the thread. The thread can receive CPU allocation and yield the CPU once premempted by the scheduler. Therefore, the instructions might not be performed continuously and it is necessary to save the part where the thread left off. Therefore, the PC register is assigned independently.

[Back](https://github.com/JaeYeopHan/for_beginner)/[Up](#part-1-4-operating-system)

</br>

---

## Multi-thread

### Pros of multi-threading

If we use process and simultaneously execute many tasks in different threads, memory space and system resource consumption are reduced. Even when communication between threads is required, data may be exchanged using the Heap area, which is a space of global variables or dynamically allocated variables, rather than using separate resources. Therefore, the inter-thread communication method is much simpler than the inter-process communication method. Context switch is also faster between threads because it does not have to empty the cache memory, unlike the context switch between process. Therefore, the system's throughput is improved and resource consumption is reduced, and the response time of the program is naturally shortened. Thanks to these advantages, tasks that can be done through multiple processes are divided into threads in only one process.
</br>

### Cons of multi-threading

Multi-process programming has no shared resource between the process, disabling simultaneous access to the same resource. However, we should be careful when programming based on multithreading. Because different threads share data and heap areas, some threads can access variables or data structures currently in use in other threads, consequently read or modify the wrong value.

Therefore, in the multi-threading setting, synchronization is required. Synchronization controls the order of operations and access to shared resources. However, some bottlenecks might arise due to excessive locks and degrade the performance. Therefore, we need to reduce bottlenecks.

</br>

### Multi-thread vs Multi-process

Compared to multi-process, multi-thread occupies less memory space and has faster context switch, but if one thread terminates, all other threads might be terminated and synchonization problem might occur. On the other hand, multi-process has an advantage that even when a process is terminated, other processed are unaffected and operates normally. However, it occupies more memory space and CPU times than multi-thread. 

These two are similar in that they perform several tasks at the same time, but they could be (dis)advantageous depending on the system in use. Depending on the characteristics of the targeted system, we should select the appropriate scheme.

[Back](https://github.com/JaeYeopHan/for_beginner)/[Up](#part-1-4-operating-system)

</br>

---

## Scheduler

_There are three types of queue for process scheduling_
* Job Queue: The set of all processes in the current system
* Ready Queue: The set of processes currently in the memory wiaitng to gain control of CPU
* Device Queue : The set of processes currently waiting for device IO's operations

There are also **three types** of schedulers that insert and pop processes into each queue

### Long-term scheduler or job scheduler

The memory is limited, and when many processes are loaded into memory at a time, they are temporarily stored in a large storage (typically disk). The job scheduler determines which process in this pool to allocate memory and send to the Ready Queue.

* In charge of scheduling between memory and disk
* Allocate process's memory and resource
* Control the degree of multiprogramming (the number of 
processes in excecution)
* Process status transition: new -> ready(in memory)

_cf) It hurts the performance when too much or too few program is loaded into the memory. For reference, there is no long-term scheduler in the time sharing system. It is just loaded to the memory immediately and becomes ready_

</br>

### Short-term scheduler or CPU scheduler

* In charge of scheduling between CPU and memory
* Determine which process in the ready queue to run
* Allocate CPU to process (schedular dispatch)
* Process status transition: ready -> rubnning -> waiting -> ready

</br>

### Medium-term scheduler or Swapper

* Migrate the entire process from memory to disk to make space (swapping).
* Deallocate memory from the process
* Control the degree of multiprogramming 
* Regulate when excessively many program is loaded to the memory of the current system. 
* Process status transition:
  ready -> suspended

#### Process state - suspended

Suspended(stopped): The memory state in which the process execution is stopped due to external factors. All the process is swapped out from disk. Blocked state could go back to the ready state on its own, since the process is waiting for other I/O operations. Suspended state cannot go back to ready state by itself, since it is caused by external factors.

[Back](https://github.com/JaeYeopHan/for_beginner)/[Up](#part-1-4-operating-system)

</br>

---

## CPU scheduler

_It schedule the process in the Ready Queue._

### FCFS(First Come First Served)

#### Characteristic

* The method that serving the customer that comes first (i.e, in the order of first-come)
* Non-Preemptive (비선점형) scheduling  
  Once a process gain the control of CPU, it completes the CPU burst nonstop without yielding control. Scheduling is performed only when the allocated CPU is yielded (returned).

#### Issue

* Convoy effect  
  When a process with long processing time is allocated, it can slow down the whole operating system.

</br>

### SJF (Shortest Job First)

#### Characteristics

* The short process with short CPU burst time is allocated first even if it comes later than other processes.
* Non-preemtive scheduling

#### Issue

* Starvation  
  Even though efficency is important, every process should be served. This scheduling might prefer the job with short CPU time so extremely that the process with long procesing time might never be allocated.  

</br>

### SRTF(Shortest Remaining Time First)

#### Characteristic
* When a new process comes, scheduling is done
* Preemptive (선전) scheduling
  If the newly arrived process has shorter CPU burst time than the remaining burst time of ongoing process, the CPU is yielded to allocate to the new process.

#### Issue

* Starvation
* Scheduling is performed for every newly arrived process, so CPU burst time (CPU used time) cannot be measured.

</br>

### Priority Scheduling

#### Characteristic

* CPU is allocated to the process with highest priority.  
The priority is expressed as an integer, where smaller number indicates higher priority.
* Preemptive (선전) scheduling method
  If a process with higher priority arrives, ongoing process will stops and yields CPU.
* Non-preemptive (비선전) scheduling
  If a process with higher priority arrives, it is put to the head of the Ready Queue.

#### Issue

* Starvation
* Indefinite blocking (무기한 봉쇄)
  The state that waits for the CPU indefinitely, because the current process is ready to run but cannot use the CPU due to low priority.

#### Solution

* Aging  
  Increase the priority of a process if it waits for a long time, regardless of how low priority it has.

</br>

### Round Robin

#### Characteristic
* Modern CPU scheduling
* Each process has the same amount of time quantime (할당 시간).
* After spending the time quantum, a process is preempted and put to the back of the Ready Queue (to be continued later)
* `RR` is efficient when the CPU burst time of each process is random.
* `RR` is possible because the process context can be saved.

#### Pros

* `Response time` is shortened.  
  If there are n processes in the ready queue and the time quantum (할당 시간) is q, no process waits more than (n-1)q time unit.
* The waiting time of the process increases with the CPU
  burst time. It is said to be fair scheduling.

#### Note
The time quantum is set too high, it behaves like `FCFS`. If it is set too low, scheduling algorithm will be ideal, but overhead might occur due to frequent context switch.

설정한 `time quantum`이 너무 커지면 `FCFS`와 같아진다.
또 너무 작아지면 스케줄링 알고리즘의 목적에는 이상적이지만 잦은 context switch 로 overhead 가 발생한다.
그렇기 때문에 적당한 `time quantum`을 설정하는 것이 중요하다.

[Back](https://github.com/JaeYeopHan/for_beginner)/[Up](#part-1-4-operation system)

</br>

---

## Synchronous and Asynchronous

### Examplified explanation

Suppose that there are 3 tasks to do: laundry, dishes, and cleaning. If these tasks are processed synchronously, we do laundry, then wash dishes, then clean the house.
If these tasks are processed asynchrously, we assign the the laundry agent to wash clothes, the dishwashing agent to wash dish, and the cleaning agent to clean. We do not know which one completes first. After finish its work, the agent will notify us, so we can do other work in the mean time.
CS-wise, it is said to be asynchronous when the operation is processed in the background thread. 

### Sync vs Async
Generally, a method is called **synchronous** when the return values is expected to come `together` with the program execution. Else, it is called **asynchronous**.
If we run a job synchronously, there is `blocking` until the program returns. If we run asynchronouly, there is no `blocking` and the job is put in the jobs queue or delegate to the background thread and we immediately execute the next code. Hence, and the job does not immediately return.

_Since it is hard to explain with word, the link to a supplementary figure is attached._

#### Reference

* http://asfirstalways.tistory.com/348

[Back](https://github.com/JaeYeopHan/for_beginner)/[Up](#part-1-4-operating-system)

</br>

---

## Process synchronization

### Critical Section (임계영역)

As mentioned in multi-threading, the section of the code that simultaneously access the same resources is referred as Critial Section

### Critical Section Problem (임계영역 문제)

Design a protocol that enable multiple processes to use Critical Section together

#### Requirements (해결을 위한 기본조건)

* Mutual Exclusion (상호 배제)  
  While process P1 is executing the Critical Section, other process can never enter their Critical Section
* Progress (진행)  
  If no process is executing in its critical section,
  only those processes that are not executing in their remainder section (i.e, has not entered its critical section) are candidate to be the next process to enter its critical section. This selection **cannot be postponed indefinitely**.

* Bounded Waiting(한정된 대기)  
  After P1 made a request to enter the Critical Section and before it receives admission, there is a bound on the number of times other processes can enter their Critical Section. (**no starvation**)

### Solutions

### Lock

As a basic hardware-based solution, to prevent simultaneous access to shared resources, the process will acquire a Lock when entering its Critical Section and release the Lock when it leaves the Critical Section.

#### Limitation
Time efficiency in multi-processor machine cannot be utilized.

### Semaphores (세마포)
* Synchroniozation tool to resolve Critical Section issues in software

#### Types

OS distinguishes between Counting and Binary semaphores

* Counting semaphore  
  Semaphore controls access to the resources by **a number indicating availability**. The semaphore is initilized to be the **number of available resources**. When a resource is used, semaphore decreases, and when a resource is released, semaphore increases.

* Binary (이진) semaphore 
  It is alaso called MUTEX (abbv. for Mutual Exclusion)
  As the name suggested, there are only to possible value: 0 and 1. This is used to solve the Critical Section Problem among processes.

#### Cons

* Busy Waiting (바쁜 대기)  

In the initial version of Semaphore (called Spin lock), the process entering Critical Section has to keep executing the code repeatedly, wasting a lot of CPU time. This is called Busy Waiting, which is inefficient except for some special situation. Generally, Semaphore will block a process attempted but failed enter its Critical Section, and wake them up when there is space in the Critical Section. This solves the time inefficiency problem of Busy Waiting.

#### Deadlock (교착상태)
* Semaphore has a Ready Queue. Deadlock is the situation in which two or more processes is waiting indefinitely to enter their Criticial Section, or the process running in its Critical Section can only exit when an awaiting process start executing.

### Monitoring
* The design structure of high-level programming language, where an abstract data form is made for developers to code in a mutually exclusive way.
* Access to shared resources requires both key acquisition and resources release after use (Semaphore requires direct key release and access to shared resources.)

[Back](https://github.com/JaeYeopHan/for_beginner)/[Up](#part-1-4-operating-system)

---

## Memory management strategy

### Background of memory management

  Each **process** has its independent memory space, so the OS need to limit process from accessing the memory space of other processes. However, only **operating system** can access the kernel memory and user (application)
  memory. 

**Swapping**: The technique to manage memory. In scheduling scheme such as round-robin, after the process uses up its CPU allocation, the process's memory is exported to the auxiliary storage device (e.g. hard disk) to make room to retrieve the other process's memory.

> This process is called **swap**. The process of bringing in the main memory (RAM) is called **swap-in**, and export to the auxiliary storage device is called **swap-out**. Swap only starts when memory space is inadequate, since disk transfer takes a long time.

**Fragmentation** (**단편화**): 
If a process is repeatedly loaded and removed from the memory, many free space in the gap between memory occupied by the process becomes too small to be usable. This is called **fragmentation**. There are 2 types of fragmentation:

| `Process A` | free | `Process B` | free | `Process C` | &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; free &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; | `Process D` |
| ----------- | ---- | ----------- | ---- | ----------- | :--------------------------------------------------------------------------------------: | ----------- |


* External fragmentation (외부 단편화): Refer to the unusable part in the memory space. Although the remaining spaces in the physical memory (RAM) are enough to be used (if combined), they are dispersed across the whole memory space. 

* Internal fragmentation (내부 단편화): Refer to the remaining part included in the memory space used by the process. For example, if the memory is splitted into free spaces of 10,000B and process A use 9,998B, and 2B remains. This is referred to as internal fragmentation.

Compression: To solve the external fragmentation, we can put the space used by the process to one side to secure the free space, but it is not efficient. (This memory status is shown in the figure below)

| `Process A` | `Process B` | `Process C` | `Process D` | &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; free &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; |
| ----------- | ----------- | ----------- | :---------: | ------------------------------------------------------------------------------------------------------------------ |


### Paging (페이징)

The method by which the memory space used by a process is not necessarily contingous. 

The method is made to handle internal fragmentation and compression.  Physical memory (물리 메모리) is separated into fixed size of Frame. Logical memory (논리 메모리 - occupied by the process) is divided into fixed size blocks, called page. (subjected to page replacement algorithm)

Paging technique brings a major advantage in resolving external fragmentation. Logical memory does not need to be store contingously in the physical memory, and can be arranged properly in the remaining frames in the physical memory.

Space used by each process is divided into and managed by several pages (in the logical memory), where individual page, **regardless of order**, is mapped and saved into the frames in the physical memory.

* Cons: Internal fragmentation might increase. For example, if page size is 1,024B and **process A** request 3,172B of memory, 4 pages is required, since if we use 3 page frames (1024 \* 3 = 3,072), there are still 100B remaining. 924B remains unused in the 4th page, leading to internal fragmentation.

### Segmentation (세그멘테이션)
The physical memory and physical memory is divided into segments of different size, instead of the same block size as in paging. 
Users designate two addresses a saved (segment number + offset).
The segment table store the reference to each segment (segment starting physical address) and a bound (segment length).

* Cons: When a segments with different length is loaded and removed reapatedly, fee space would be splitted up into many small unusable pieces (external fragmentation).

[Back](https://github.com/JaeYeopHan/for_beginner)/[Up](#part-1-4-operating-system)

---

## Virtual memory (가상 메모리)
To realize multi-programming, we need to load many process into the memory at the same time. Virtual memory is the **technique that allows a process to be executed without loading entirely into the memory**. The main advantage is that, the program can be even bigger than the physical memory.

### Background of virtual memory development

Without virtual memory, **the entirety of the code in execution must pe present in the physical memory**, so **the code bigger than the memory capacity cannot be executed**. Also, when many programs are loaded simoustaneously into the memory, there would be capacity limit and page replacement will suffer from performance issue.

In addition, since the memory occupied by occasionally used codes can be checked, the entire program does not need to be loaded to the memory.

#### If only part of the program is loaded into the memory...

* There is no restriction due to the capacity of the physical memory.
* More program can be executed simultanoeusly. Therefore, `response time` is maintained while `CPU utilization` and `process rate` is improved.
* [swap](#memory-managment-background) requires less I/O, expediting the execution.

### Virtual memory usage

Virtual memory separate the concept of physical memory in reality and the concept of user's logical memory. Thereby, even with small memory, programmers can have unlimitedly large `virtual memory space`.

#### Virtual address space (가상 주소 공간)

* Virtual memory is the a space that implements the logical location in which a process is stored in memory.
  The memory space requested by the process is provided in the virtual memory. Thereby, the memory space not immediately required does not need to be loaded to the actual physical memory, saving the physical memory.
* For example, assume a process is executing and requires 100KB in the virtual memory.
  However, if the sum of the memory space `(Heap section, Stack sec, code, data)` required to run is 40KB, it can be understood that only 40KB is listed in the actual physical memory, and the remaining 60KB is required for physical memory if necessary.

However, if the total of the memory space required `(HEAP segment, stack segment, code, data)` is 40 KB, only 40 KB is loaded to the actual physical memory, and the remaining 60KB is only requested from the physical memory when necessary.
| `Stack` | &nbsp;&nbsp;&nbsp; free (60KB) &nbsp;&nbsp;&nbsp;&nbsp; | `Heap` | `Data` | `Code` |
| ------- | ------------------------------------------------------- | :----: | ------ | ------ |


#### Sharing pages among process (프로세스간의 페이지 공유)

With virtual memory, ...

* `system libraries` can be shared among several process.
  Each process can recognize and use the `shared libraries` as if they are in its own virtual addess space, but the `physical memory page` locating those libraries can be shared among all processes. 
* The processes can share memory, and communicate via shared memory.  
  Each process also has the illusion of its own address space, but the actual physical memory is shared.
* Page sharing is enable in process creation by `fork()`.

### Demand Paging (요구 페이징)

At the start of program execution, instead of loading the entire program into physical memory of the disk at the start of program execution, demand paging is the strategy that only loads the initially required part. It is widely ussed in virtual memory system. The virtual memory is mainly managed by [Paging](#paging-페이징) method.

In the virtual memory with demand paging, the pages are loaded when necessary during execution. **The pages that are not accessed are never loaded into the physical memory**.

Individual page in the process is manage by `pager (페이저)`. During execution, pager only reads and transfers necessary pages into the memory, thereby **the time and memory consumption for the the unused pages is reduced**.

#### Page fault trap (페이지 부재 트랩)

### Page replacement

In `demand paging`, as mentioned, not all parts of a program in execution is loaded into the physical memory. When the process requests a necessary page for its operation, `page fault (페이지 부제)` might happen and the desired pages are brought from the auxiliary storage devices. However, in case all physical memory is used, page replacement must take place. (Or, the OS must force the process termination).

#### Basic methods

If all physical memory is in use, the replacement flows as follow:
1. Locate the required page in disk.
2. Find an empty page frame.
    1. Using `Page replacement algorithm`, choose a victim page.
    1. Record the victim page on disk and update the related page table.
1. Read a new page to the empty frame and update the page table.
2. Restart the user process.
  

#### Page replacement algorithm

##### FIFO page replacement

The simpliest page replacement algorithm has a FIFO (first-in-first-out) flow. That is, the page is replaced in the order of entering the physical memory.

* Pros:
  
  * Easy to understand and implement

* Cons:
  * The old pages might include necessary information (initial variables, ...).
  * The pages actively used fromt he beginning might get replaced, increasing page fault rate.
  * `Belady anomaly`: increasing the number of page frames might result in an increase in the number of page faults.

##### Optimal Page Replacement (최적 페이지 교체)
After `Belady's anomaly` is confirmed, people started exploring the optimal replacement algorithm, which has lower page fault rate than all other algorithms, and eliminates `Belady's anomaly`. The core of this algorithm is to find and replace pages that will not be used for the longest time in the future.
This is mainly used in research for comparison purpose.

* Pros
  * Guaranteed to have the least page fault among all algorithms

* Cons
  * It is hard to implement, because there is no way to know in advance how each process reference the memory.

##### LRU Page Replacement (LRU 페이지 교체)

`LRU: Least-Recently-Used` 
The least recently used page is selected for replacement. This algoritms approximates the optimal algorithm 

* Characteristic
  * Generally, `FIFO algorithm` is better then FIFO algorithm, but nto as good as `optimal algorithm`.

##### LFU Page Replacement (LFU 페이지 교체)

`LFU: Least Frequently Used`  
The page that is referenced the leats time is replaced. The algoritm is made under the assumption that the actively used pages is referenced more.
* Characteristic
  * After a particular process use a specific page intensively, the page might remain in the memory even if it is no longer used. This goes against the intial assumption.
  * Since it does not properly approximate the optimal page replacement, it is not widely applied.

##### MFU 페이지 교체(MFU Page Replacement)

`MFU: Most Frequently Used`  
  The page is based on the assumption that the infrequently-referenced page was recently loaded to memory and will continue to be used in the future.

* Characteristic
  * Since it does not properly approximate the optimal page replacement, it is not widely applied.

</br>

[Back](https://github.com/JaeYeopHan/for_beginner)/[Up](#part-1-4-operating-system)

---

## Locality of Cache

### Locality principle of cache

Cache memory is a widely used memory to reduce the bottlenecks due to speed difference between fast and slow device. To fulfill this role, it must be able to predict to some extent what data the CPU will want. This is because the performance of the cache depends on how much useful information (referenced later by the CPU) in a small capacity cache memory

This use the locality (지역성) principle of the data to maximize the `hit rate (적종율)`. As the prerequisites of locality, the program does not access all code or data equally. In other words, locality is a characterisitc of intensively referencing only a specfific part of the program at a specific time, instead of accessing all the information in the storage device equally.

Data locality is typically divided into Temporal Locality ̣̣(시간 지역성) and Spacial Locality (공간 지역성).

* Temporal locality: the content of recently referenced address is likely to be referenced again soon.
* Spacial Locality: In most real program, the content at the address adjacent to the previously referenced addresses is likely to be referenced.

</br>

### Caching line
As mentioned, the cache, located near the processor, is the place to put frequently used data. However, the target data is stored anywhere in the cache. No matter how close the cache is, traversing through the cache to find the target data will take a long time. If the target data is stored in the cache, the cache becomes meaningful only if the data can be accessed and read immediately.

Therefore, when storing data into the cache, we use a special data structure that stores data as bundle, called **cache line**. Since the process use data stored at many different addresses, the frequently used data is also scattered. Thus, it is necessary to attach a tag that records the corresponding memory addresses along with the data. This bundle is called caching line, and the cache line is brought to the cache.
Typically, there are three methods:

1.  Full Associative
2.  Set Associative
3.  Direct Map

[Back](https://github.com/JaeYeopHan/for_beginner)/[Up](#part-1-4-operating-system)

</br>

---

</br>

_OS.end_
