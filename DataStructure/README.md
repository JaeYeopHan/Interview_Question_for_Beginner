# Part 1-1 DataStructure
* [Array vs LinkedList](#array-vs-linkedlist)
* [Stack and Queue](#stack-and-queue)
* [Tree](#tree)
  * Binary Tree
  * Full Binary Tree
  * Complete Binary Tree
  * BST(Binary Search Tree)
* [Heap](#heap)
* [Red Black Tree](#red-black-tree)
  * 정의
  * 특징
  * 삽입
  * 삭제
* [Hash](#hash)

[뒤로](https://github.com/JaeYeopHan/for_beginner)

## Array vs LinkedList
### Array
가장 기본적인 자료구조인 `Array` 자료구조는, 논리적 저장 순서와 물리적 저장 순서가 일치한다. 따라서 `인덱스`(index)로 해당 원소(element)에 접근할 수 있다. 그렇기 때문에 찾고자 하는 원소의 인덱스 값을 알고 있으면 `Big-O(1)`에 해당 원소로 접근할 수 있다. 즉 **random access** 가 가능하다는 장점이 있는 것이다.

하지만 삭제 또는 삽입의 과정에서는 해당 원소에 접근하여 작업을 완료한 뒤(Big-O(1)), 또 한 가지의 작업을 추가적으로 해줘야 하기 때문에, 시간이 더 걸린다. 만약 배열의 원소 중 어느 원소를 삭제했다고 했을 때, 배열의 연속적인 특징이 깨지게 된다. 즉 빈 공간이 생기는 것이다. 따라서 삭제한 원소보다 큰 인덱스를 갖는 원소들을 `shift`해줘야 하는 비용(cost)이 발생하고 이 경우의 시간 복잡도는 Big-O(n)가 된다. 그렇기 때문에 Array 자료구조에서 삭제 기능에 대한 time complexity의 worst case는 Big-O(n)이 된다.

삽입의 경우도 마찬가지이다. 만약 첫번째 자리에 새로운 원소를 추가하고자 한다면 모든 원소들의 인덱스를 1씩 shift 해줘야 하므로 이 경우도 O(n)의 시간을 요구하게 된다.

### LinkedList
이 부분에 대한 문제점을 해결하기 위한 자료구조가 linked list이다. 각각의 원소들은 자기 자신 다음에 어떤 원소인지만을 기억하고 있다. 따라서 이 부분만 다른 값으로 바꿔주면 삭제와 삽입을 O(1) 만에 해결할 수 있는 것이다.

하지만 LinkedList 역시 한 가지 문제가 있다. 바로 Search 과정에 있어서 첫번째 원소부터 다 확인해봐야 한다는 것이다. Array와는 달리 논리적 저장 순서와 물리적 저장 순서가 일치하지 않기 때문이다. 이 과정 때문에, 어떠한 원소를 삭제 또는 추가하고자 했을 때, 그 원소를 찾기 위해서 O(n)의 시간이 추가적으로 발생하게 된다.

결국 linked list 자료구조는 search에도  O(n)의 time complexity를 갖고, 삽입, 삭제에 대해서도  O(n)의 time complexity를 갖는다. 그렇다고 해서 아주 쓸모없는 자료구조는 아니기에, 우리가 학습하는 것이다. 이 Linked List는 Tree 구조의 근간이 되는 자료구조이며, Tree에서 사용되었을 때 그 유용성이 드러난다.


[뒤로](https://github.com/JaeYeopHan/for_beginner)/[위로](#part-1-1-DataStructure)

</br>

## Stack and Queue
### Stack
선형 자료구조의 일종으로 `Last In First Out (LIFO)`. 즉, 나중에 들어간 원소가 먼저 나온다. 이것은 Stack의 가장 큰 특징이다. 차곡차곡 쌓이는 구조로 먼저 stack에 들어가게 된 원소는 맨 바닥에 깔리게 된다. 그렇기 때문에 늦게 들어간 녀석들은 그 위에 쌓이게 되고 호출 시 가장 위에 있는 녀석이 호출되는 구조이다.

### Queue
선형 자료구조의 일종으로 `First In First Out (FIFO)`. 즉, 먼저 들어간 놈이 먼저 나온다. Stack 과는 반대로 먼저 들어간 놈이 맨 앞에서 대기하고 있다가 먼저 나오게 되는 구조이다. 참고로 Java Collection에서 `Queue`는 인터페이스이다. 이를 구현하고 있는 `Priority queue`등을 사용할 수 있다.

#### Personal Recommendation
* Stack을 사용하여 미로찾기 구현하기
* Queue를 사용하여 Heap 자료구조 구현하기
* Stack 두 개로 Queue 자료구조 구현하기

[뒤로](https://github.com/JaeYeopHan/for_beginner)

</br>

## Tree
트리는 스택이나 큐와 같은 선형 구조가 아닌 비선형 자료구조이다. 트리는 계층적 관계(Hierachical Relationship)을 표현하는 자료구조이다. 이 `트리`라는 자료구조는 표현에 집중한다. 무엇인가를 저장하고 꺼내야 한다는 사고에서 벗어나 트리라는 자료구조를 바라보자.

#### 트리를 구성하고 있는 구성요소들(용어)
* Node (노드) : 트리를 구성하고 있는 각각의 요소를 의미한다.
* Edge (간선) : 트리를 구성하기 위해 노드와 노드를 연결하는 선을 의미한다.
* Root Node (루트 노드) : 트리 구조에서 최상위에 있는 노드를 의미한다.
* Terminal Node ( = leaf Node, 단말 노드) : 하위에 다른 노드가 연결되어 있지 않은 노드를 의미한다.
* Internal Node (내부노드, 비단말 노드) : 단말 노드를 제외한 모든 노드로 루트 노드를 포함한다.


### Binary Tree (이진 트리)
루트 노드를 중심으로 두 개의 서브 트리(큰 트리에 속하는 작은 트리)로 나뉘어 진다. 또한 나뉘어진 두 서브 트리도 모두 이진 트리어야 한다. 재귀적인 정의라 맞는듯 하면서도 이해가 쉽지 않을 듯하다. 한 가지 덧붙이자면 공집합도 이진 트리로 포함시켜야 한다. 그래야 재귀적으로 조건을 확인해갔을 때, leaf node에 다 달았을 때, 정의가 만족되기 때문이다. 자연스럽게 노드가 하나 뿐인 것도 이진 트리 정의에 만족하게 된다.

트리에서는 각 `층별로` 숫자를 매겨서 이를 트리의 `Level(레벨)`이라고 한다. 레벨의 값은 0부터 시작하고 따라서 루트 노트의 레벨은 0이다. 그리고 트리의 최고 레벨을 가리켜 해당 트리의 `height(높이)`라고 한다.

#### Full Binary Tree (포화 이진 트리), Complete Binary Tree (완전 이진 트리)
모든 레벨이 꽉 찬 이진 트리를 가리켜 포화 이진 트리라고 한다. 위에서 아래로, 왼쪽에서 오른쪽으로 순서대로 차곡차곡 채워진 이진 트리를 가리켜 완전 이진 트리라고 한다.

`Full Binary Tree`와 `complete binary tree`는 노드의 개수가 n개 일 때, i번째 노드에 대해서 parent(i) = i/2 , left_child(i) = 2i , right_child(i) = 2i + 1 의 index 값을 갖는다.


### BST(Binary Search Tree)
효율적인 탐색을 위해서는 어떻게 찾을까만 고민해서는 안된다. 그보다는 효율적인 탐색을 위한 저장방법이 무엇일까를 고민해야 한다. 이진 탐색 트리는 이진 트리의 일종이다. 단 이진 탐색 트리에는 데이터를 저장하는 규칙이 있다. 그리고 그 규칙은 특정 데이터의 위치를 찾는데 사용할 수 있다.
* 규칙 1. 이진 탐색 트리의 노드에 저장된 키는 유일하다.
* 규칙 2. 루트 노드의 키가 왼쪽 서브 트리를 구성하는 어떠한 노드의 키보다 크다.
* 규칙 3. 루트 노드의 키가 오른쪽 서브 트리를 구성하는 어떠한 노드의 키보다 작다.
* 규칙 4. 왼쪽과 오른쪽 서브트리도 이진 탐색 트리이다.

이진 탐색 트리의 탐색 연산은 O(log n)의 시간 복잡도를 갖는다. 트리의 높이를 하나씩 더해갈수록 추가할 수 있는 노드의 수가 두 배씩 증가하기 때문이다. 하지만 이러한 이진 탐색 트리는 Skewed Tree(편향 트리)가 될 수 있다. 저장 순서에 따라 계속 한 쪽으로만 노드가 추가되는 경우가 발생하기 때문이다. 이럴 경우 성능에 영향을 미치게 되며, 탐색의 Worst Case가 되고 시간 복잡도는 O(n)이 된다.

배열보다 많은 메모리를 사용하며 데이터를 저장했지만 탐색에 필요한 시간 복잡도가 같게 되는 비효율적인 상황이 발생한다. 이를 해결하기 위해 `Rebalancing` 기법이 등장하였다. 균형을 잡기 위한 트리 구조의 재조정을 `Rebalancing`이라 한다. 이 기법을 구현한 트리에는 여러 종류가 존재하는데 그 중에서 하나가 뒤에서 살펴볼 `Red-Black Tree`이다.


#### Personal Recommendation
* Binary Search Tree 구현하기
* 주어진 트리가 Binary 트리인지 확인하는 알고리즘 구현하기

[뒤로](https://github.com/JaeYeopHan/for_beginner)

</br>

## Heap
자료구조의 일종으로 Tree의 형식을 하고 있으며, Tree 중에서도 배열에 기반한 `Complete Binary Tree`이다. 배열에 트리의 값들을 넣어줄 때, 0번째는 건너뛰고 1번 index부터 루트노드가 시작된다. 이는 노드의 고유번호 값과 배열의 index를 일치시켜 혼동을 줄이기 위함이다. `힙(Heap)`에는 `최대힙(max heap)`, `최소힙(min heap)` 두 종류가 있다.

`Max Heap`이란, 각 노드의 값이 해당 children 의 값보다 **크거나 같은** `complete binary tree`를 말한다. ( Min heap은 그 반대이다.)

`Max heap`에서는 Root node에 있는 값이 제일 크므로, 최대값을 찾는데 소요되는 연산의 time complexity이 O(1)이다. 그리고 `complete binary tree`이기 때문에 배열을 사용하여 효율적으로 관리할 수 있다. (즉, random access가 가능하다. Min heap 에서는 최소값을 찾는데 소요되는 연산의 time complexity가 O(1)이다.)

#### Personal Recommendation
* Heapify 구현하기

[뒤로](https://github.com/JaeYeopHan/for_beginner)

</br>

## Red Black Tree
RBT(Red-Black Tree)는 BST를 기반으로하는 트리 형식의 자료구조이다. 결론부터 말하자면 Red-Black Tree에 데이터를 저장하게되면 Search, Insert, Delete 에 O(log n)의 시간 복잡도가 소요된다. 동일한 노드의 개수일 때, depth를 최소화하여 시간 복잡도를 줄이는 것이 핵심 아이디어이다. 동일한 노드의 개수일 때, depth가 최소가 되는 경우는 tree가 complete binary tree인 경우이다.

### Red-Black Tree의 정의
Red-Black Tree는 다음의 성질들을 만족하는 BST이다.
1) 각 노드는 `Red` or `Black`이라는 색깔을 갖는다.
2) Root node의 색깔은 `Black`이다.
3) 각 leaf node는 `black`이다.
4) 어떤 노드의 색깔이 `red`라면 두 개의 children의 색깔은 모두 black이다.
5) 각 노드에 대해서 노드로부터 descendant leaves까지의 단순 경로는 모두 같은 수의 black nodes들을 포함하고 있다. 이를 해당 노드의 `Black-Height`라고 한다.
_cf) Black-Height: 노드 x로부터 노드 x를 포함하지 않은 leaf node까지의 simple path 상에 있는 black nodes들의 개수_

### Red-Black Tree의 특징
1) Binary Search Tree이므로 BST의 특징을 모두 갖는다.
2) Root node 부터 leaf node 까지의 모든 경로 중 최소 경로와 최대 경로의 크기 비율은 2보다 크지 않다. 이러한 상태를 `balanced` 상태라고 한다.
3) 노드의 child가 없을 경우 child를 가리키는 포인터는 NIL 값을 저장한다. 이러한 NIL들을 leaf node로 간주한다.

_RBT는 BST의 삽입, 삭제 연산 과정에서 발생할 수 있는 문제점을 해결하기 위해 만들어진 자료구조이다. 이를 어떻게 해결한 것인가?_

### 삽입
우선 BST의 특성을 유지하면서 노드를 삽입을 한다. 그리고 삽입된 노드의 색깔을 **RED로** 지정한다. Red로 지정하는 이유는 Black-Height 변경을 최소화하기 위함이다. 삽입 결과 RBT의 특성 위배(violation)시 노드의 색깔을 조정하고, Black-Height가 위배되었다면 rotation을 통해 height를 조정한다. 이러한 과정을 통해 RBT의 동일한 height에 존재하는 internal node들의 Black-height가 같아지게 되고 최소 경로와 최대 경로의 크기 비율이 2미만으로 유지된다.

### 삭제
삭제도 삽입과 마찬가지로 BST의 특성을 유지하면서 해당 노드를 삭제한다. 삭제될 노드의 child의 개수에 따라 rotation 방법이 달라지게 된다. 그리고 만약 지워진 노드의 색깔이 Black이라면 Black-Height가 1 감소한 경로에 black node가 1개 추가되도록 rotation하고 노드의 색깔을 조정한다. 지워진 노드의 색깔이 red라면 Violation이 발생하지 않으므로 RBT가 그대로 유지된다.

Java에서 ArrayList도 내부적으로 RBT로 이루어져 있고, HashMap에서의 Seperate Chaining에서도 사용된다. 그만큼 효율이 좋고 중요한 자료구조이다.

[뒤로](https://github.com/JaeYeopHan/for_beginner)

</br>

## Hash


</br>

_DataStructure.end_  
[뒤로](https://github.com/JaeYeopHan/for_beginner)
