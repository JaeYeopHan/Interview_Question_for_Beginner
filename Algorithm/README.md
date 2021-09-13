# Algorithm

* [코딩 테스트를 위한 Tip](#코딩-테스트를-위한-tip)
* [문제 해결을 위한 전략적 접근](#문제-해결을-위한-전략적-접근)
* [Sorting Algorithm](#sorting-algorithm)
* [Prime Number Algorithm](#prime-number-algorithm)

[뒤로](https://github.com/JaeYeopHan/for_beginner)

## 코딩 테스트를 위한 Tip

> Translate this article: [How to Rock an Algorithms Interview](https://web.archive.org/web/20110929132042/http://blog.palantir.com/2011/09/26/how-to-rock-an-algorithms-interview/)

### 1. 칠판에 글쓰기를 시작하십시오.

이것은 당연하게 들릴지 모르지만, 빈 벽을 쳐다 보면서 수십 명의 후보자가 붙어 있습니다. 나는 아무것도 보지 않는 것보다 문제의 예를 응시하는 것이 더 생산적이라고 생각합니다. 관련성이있는 그림을 생각할 수 있다면 그 그림을 그립니다. 중간 크기의 예제가 있으면 작업 할 수 있습니다. (중간 크기는 작은 것보다 낫습니다.) 때로는 작은 예제에 대한 솔루션이 일반화되지 않기 때문입니다. 또는 알고있는 몇 가지 명제를 적어 두십시오. 뭐라도 하는 것이 아무것도 안 하는 것보다 낫습니다.

### 2. 그것을 통해 이야기하십시오.

자신이 한 말이 어리석은 소리일까 걱정하지 마십시오. 많은 사람들이 문제를 조용히 생각하는 것을 선호하지만, 문제를 풀다가 막혔다면 말하는 것이 한 가지 방법이 될 수 있습니다. 가끔은 면접관에게 진행 상황에 대해서 명확하게 말하는 것이 지금 문제에서 무슨 일이 일어나고 있는지 이해할 수 있는 계기가 될 수 있습니다. 당신의 면접관은 당신이 그 생각을 추구하도록 당신을 방해 할 수도 있습니다. 무엇을 하든지 힌트를 위해 면접관을 속이려 하지 마십시오. 힌트가 필요하면 정직하게 질문하십시오.

### 3. 알고리즘을 생각하세요.

때로는 문제의 세부 사항을 검토하고 해결책이 당신에게 나올 것을 기대하는 것이 유용합니다 (이것이 상향식 접근법 일 것입니다). 그러나 다른 알고리즘에 대해서도 생각해 볼 수 있으며 각각의 알고리즘이 당신 앞의 문제에 적용되는지를 질문 할 수 있습니다 (하향식 접근법). 이러한 방식으로 참조 프레임을 변경하면 종종 즉각적인 통찰력을 얻을 수 있습니다. 다음은 면접에서 요구하는 문제의 절반 이상을 해결하는 데 도움이되는 알고리즘 기법입니다.

* Sorting (plus searching / binary search)
* Divide and Conquer
* Dynamic Programming / Memoization
* Greediness
* Recursion
* Algorithms associated with a specific data structure (which brings us to our fourth suggestion...)

### 4. 데이터 구조를 생각하십시오.

상위 10 개 데이터 구조가 실제 세계에서 사용되는 모든 데이터 구조의 99 %를 차지한다는 것을 알고 계셨습니까? 때로는 최적의 솔루션이 블룸 필터 또는 접미어 트리를 필요로하는 문제를 묻습니다. 하지만 이러한 문제조차도 훨씬 더 일상적인 데이터 구조를 사용하는 최적의 솔루션을 사용하는 경향이 있습니다. 가장 자주 표시 될 데이터 구조는 다음과 같습니다.

* Array
* Stack / Queue
* HashSet / HashMap / HashTable / Dictionary
* Tree / Binary tree
* Heap
* Graph

### 5. 이전에 보았던 관련 문제와 해결 방법에 대해 생각해보십시오.

여러분에게 제시한 문제는 이전에 보았던 문제이거나 적어도 조금은 유사합니다. 이러한 솔루션에 대해 생각해보고 문제의 세부 사항에 어떻게 적응할 수 있는지 생각하십시오. 문제가 제기되는 형태로 넘어지지는 마십시오. 핵심 과제로 넘어 가서 과거에 해결 한 것과 일치하는지 확인하십시오.

### 6. 문제를 작은 문제로 분해하여 수정하십시오.

특별한 경우 또는 문제의 단순화 된 버전을 해결하십시오. 코너 케이스를 보는 것은 문제의 복잡성과 범위를 제한하는 좋은 방법입니다. 문제를 큰 문제의 하위 집합으로 축소하면 작은 부분부터 시작하여 전체 범위까지 작업을 진행할 수 있습니다. 작은 문제의 구성으로 문제를 보는 것도 도움이 될 수 있습니다.

### 7. 되돌아 오는 것을 두려워하지 마십시오.

특정 접근법이 효과적이지 않다고 느끼면 다른 접근 방식을 시도 할 때가 있습니다. 물론 너무 쉽게 포기해서는 안됩니다. 그러나 열매를 맺지 않고도 유망한 생각이 들지 않는 접근법에 몇 분을 소비했다면, 백업하고 다른 것을 시도해보십시오. 저는 덜 접근한 지원자보다 한참 더 많이 나아간 지원자를 많이 보았습니다. 즉, (모두 평등 한) 다른 사람들이 좀 더 기민한 접근 방식을 포기해야 한다는 것을 의미합니다.

[뒤로](https://github.com/JaeYeopHan/for_beginner)/[위로](#algorithm)

</br>

## 문제 해결을 위한 전략적 접근

### 코딩 테스트의 목적

1.  문제 해결 여부
2.  예외 상황과 경계값 처리
3.  코드 가독성과 중복 제거 여부 등 코드 품질
4.  언어 이해도
5.  효율성

궁극적으로는 문제 해결 능력을 측정하기 위함이며 이는 '어떻게 이 문제를 창의적으로 해결할 것인가'를 측정하기 위함이라고 볼 수 있다.

### 접근하기

1.  문제를 공격적으로 받아들이고 필요한 정보를 추가적으로 요구하여, 해당 문제에 대해 완벽하게 이해하는게 우선이다.
2.  해당 문제를 익숙한 용어로 재정의하거나 문제를 해결하기 위한 정보를 추출한다. 이 과정을 추상화라고 한다.
3.  추상화된 데이터를 기반으로 이 문제를 어떻게 해결할 지 계획을 세운다. 이 때 사용할 알고리즘과 자료구조를 고민한다.
4.  세운 계획에 대해 검증을 해본다. 수도 코드 작성도 해당될 수 있고 문제 출제자에게 의견을 물어볼 수도 있다.
5.  세운 계획으로 문제를 해결해본다. 해결이 안 된다면 앞선 과정을 되짚어본다.

### 생각할 때

* 비슷한 문제를 생각해본다.
* 단순한 방법으로 시작하여 점진적으로 개선해나간다.
* 작은 값을 생각해본다.
* 그림으로 그려본다.
* 수식으로 표현해본다.
* 순서를 강제해본다.
* 뒤에서부터 생각해본다.

</br>

### 해결 방법 분류

#### DP(동적 계획법)

복잡한 문제를 간단한 여러 개의 하위 문제(sub-problem)로 나누어 푸는 방법을 말한다.

DP 에는 두 가지 구현 방식이 존재한다.

* top-down : 여러 개의 하위 문제(sub-problem) 나눴을시에 하위 문제를 결합하여 최종적으로 최적해를 구한다.
  * 같은 하위 문제를 가지고 있는 경우가 존재한다.
    그 최적해를 저장해서 사용하는 경우 하위 문제수가 기하급수적으로 증가할 때 유용하다.
    위 방법을 memoization 이라고 한다.
* bottom-up : top-down 방식과는 하위 문제들로 상위 문제의 최적해를 구한다.

Fibonacci 수열을 예로 들어보면,

```
top-down
f (int n) {
  if n == 0 : return 0
  elif n == 1: return 1
  if dp[n] has value : return dp[n]
  else : dp[n] = f(n-2) + f(n-1)
         return dp[n]
}
```

```
bottom-up
f (int n){
  f[0] = 0
  f[1] = 1
  for (i = 2; i <= n; i++) {
   f[i] = f[i-2] + f[i-1]
  }
  return f[n]
}
```

#### 접근방법

1.  모든 답을 만들어보고 그 중 최적해의 점수를 반환하는 완전 탐색 알고리즘을 설계한다.
2.  전체 답의 점수를 반환하는 것이 아니라, 앞으로 남은 선택들에 해당하는 저수만을 반환하도록 부분 문제 정의를 변경한다.
3.  재귀 호출의 입력 이전의 선택에 관련된 정보가 있다면 꼭 필요한 것만 남기고 줄인다.
4.  입력이 배열이거나 문자열인 경우 가능하다면 적절한 변환을 통해 메모이제이션할 수 있도록 조정한다.
5.  메모이제이션을 적용한다.

#### Greedy (탐욕법)

모든 선택지를 고려해보고 그 중 가장 좋은 것을 찾는 방법이 Divide conquer or dp 였다면
greedy 는 각 단계마다 지금 당장 가장 좋은 방법만을 선택하는 해결 방법이다.
탐욕법은 동적 계획법보다 수행 시간이 훨씬 빠르기 때문에 유용하다.
많은 경우 최적해를 찾지 못하고 적용될 수 있는 경우가 두 가지로 제한된다.

1.  탐욕법을 사용해도 항상 최적해를 구할 수 있는 경우
2.  시간이나 공간적 제약으로 최적해 대신 근사해를 찾아서 해결하는 경우

#### 접근 방법

1.  문제의 답을 만드는 과정을 여러 조각으로 나눈다.
2.  각 조각마다 어떤 우선순위로 선택을 내려야 할지 결정한다. 작은 입력을 손으로 풀어본다.
3.  다음 두 속성이 적용되는지 확인해본다.

1)  탐욕적 성택 속성 : 항상 각 단계에서 우리가 선택한 답을 포함하는 최적해가 존재하는가
2)  최적 부분 구조 : 각 단계에서 항상 최적의 선택만을 했을 때, 전체 최적해를 구할 수 있는가

#### Reference

[프로그래밍 대회에서 배우는 알고리즘 문제 해결 전략](http://www.yes24.com/24/Goods/8006522?Acode=101)

[뒤로](https://github.com/JaeYeopHan/for_beginner)/[위로](#algorithm)

</br>

## Sorting Algorithm

Sorting 알고리즘은 크게 Comparisons 방식과 Non-Comparisons 방식으로 나눌 수 있다.

### Comparisons Sorting Algorithm (비교 방식 알고리즘)

`Bubble Sort`, `Selection Sort`, `Insertion Sort`, `Merge Sort`, `Heap Sort`, `Quick Sort` 를 소개한다.

### Bubble Sort

n 개의 원소를 가진 배열을 정렬할 때, In-place sort 로 인접한 두 개의 데이터를 비교해가면서 정렬을 진행하는 방식이다. 가장 큰 값을 배열의 맨 끝에다 이동시키면서 정렬하고자 하는 원소의 개수 만큼을 두 번 반복하게 된다.

| Space Complexity | Time Complexity |
| :--------------: | :-------------: |
|       O(1)       |     O(n^2)      |

#### [code](https://github.com/JaeYeopHan/algorithm_basic_java/blob/master/src/test/java/sort/BubbleSort.java)

</br>

### Selection Sort

n 개의 원소를 가진 배열을 정렬할 때, 계속해서 바꾸는 것이 아니라 비교하고 있는 값의 index 를 저장해둔다. 그리고 최종적으로 한 번만 바꿔준다. 하지만 여러 번 비교를 하는 것은 마찬가지이다.

| Space Complexity | Time Complexity |
| :--------------: | :-------------: |
|       O(1)       |     O(n^2)      |

#### [code](https://github.com/JaeYeopHan/algorithm_basic_java/blob/master/src/test/java/sort/SelectionSort.java)

</br>

### Insertion Sort

n 개의 원소를 가진 배열을 정렬할 때, i 번째를 정렬할 순서라고 가정하면, 0 부터 i-1 까지의 원소들은 정렬되어있다는 가정하에, i 번째 원소와 i-1 번째 원소부터 0 번째 원소까지 비교하면서 i 번째 원소가 비교하는 원소보다 클 경우 서로의 위치를 바꾸고, 작을 경우 위치를 바꾸지 않고 다음 순서의 원소와 비교하면서 정렬해준다. 이 과정을 정렬하려는 배열의 마지막 원소까지 반복해준다.

| Space Complexity | Time Complexity |
| :--------------: | :-------------: |
|       O(1)       |     O(n^2)      |

#### [code](https://github.com/JaeYeopHan/algorithm_basic_java/blob/master/src/test/java/sort/InsertionSort.java)

</br>

### Merge Sort

기본적인 개념으로는 n 개의 원소를 가진 배열을 정렬할 때, 정렬하고자 하는 배열의 크기를 작은 단위로 나누어 정렬하고자 하는 배열의 크기를 줄이는 원리를 사용한다. `Divide and conquer`라는, "분할하여 정복한다"의 원리인 것이다. 말 그대로 복잡한 문제를 복잡하지 않은 문제로 분할하여 정복하는 방법이다. 단 분할(divide)해서 정복했으니 정복(conquer)한 후에는 **결합(combine)** 의 과정을 거쳐야 한다.

`Merge Sort`는 더이상 나누어지지 않을 때 까지 **반 씩(1/2)** 분할하다가 더 이상 나누어지지 않은 경우(원소가 하나인 배열일 때)에는 자기 자신, 즉 원소 하나를 반환한다. 원소가 하나인 경우에는 정렬할 필요가 없기 때문이다. 이 때 반환한 값끼리 **`combine`될 때, 비교가 이뤄지며,** 비교 결과를 기반으로 정렬되어 **임시 배열에 저장된다.** 그리고 이 임시 배열에 저장된 순서를 합쳐진 값으로 반환한다. 실제 정렬은 나눈 것을 병합하는 과정에서 이뤄지는 것이다.

결국 하나씩 남을 때까지 분할하는 것이면, 바로 하나씩 분할해버리면 되지 않을까? 재귀적으로 정렬하는 원리인 것이다. 재귀적 구현을 위해 1/2 씩 분할한다.

| Space Complexity | Time Complexity |
| :--------------: | :-------------: |
|       O(n)       |    O(nlogn)     |

</br>

### Heap Sort

`binary heap` 자료구조를 활용할 Sorting 방법에는 두 가지 방법이 존재한다. 하나는 정렬의 대상인 데이터들을 힙에 넣었다가 꺼내는 원리로 Sorting 을 하게 되는 방법이고, 나머지 하나는 기존의 배열을 `heapify`(heap 으로 만들어주는 과정)을 거쳐 꺼내는 원리로 정렬하는 방법이다. `heap`에 데이터를 저장하는 시간 복잡도는 `O(log n)`이고, 삭제 시간 복잡도 또한 `O(log n)`이 된다. 때문에 힙 자료구조를 사용하여 Sorting 을 하는데 time complexity 는 `O(log n)`이 된다. 이 정렬을 하려는 대상이 n 개라면 time complexity 는 `O(nlogn)`이 된다.

`Heap`자료구조에 대한 설명은 [DataStructure - Binary Heap](https://github.com/JaeYeopHan/Interview_Question_for_Beginner/tree/master/DataStructure#binary-heap)부분을 참고하면 된다.

| Space Complexity | Time Complexity |
| :--------------: | :-------------: |
|       O(1)       |    O(nlogn)     |

</br>

### Quick Sort

Sorting 기법 중 가장 빠르다고 해서 quick 이라는 이름이 붙여졌다. **하지만 Worst Case 에서는 시간복잡도가 O(n^2)가 나올 수도 있다.** 하지만 `constant factor`가 작아서 속도가 빠르다.

`Quick Sort` 역시 `Divide and Conquer` 전략을 사용하여 Sorting 이 이루어진다. Divide 과정에서 `pivot`이라는 개념이 사용된다. 입력된 배열에 대해 오름차순으로 정렬한다고 하면 이 pivot 을 기준으로 좌측은 pivot 으로 설정된 값보다 작은 값이 위치하고, 우측은 큰 값이 위치하도록 `partition`된다. 이렇게 나뉜 좌, 우측 각각의 배열을 다시 재귀적으로 Quick Sort 를 시키면 또 partition 과정이 적용된다.이 때 한 가지 주의할 점은 partition 과정에서 pivot 으로 설정된 값은 다음 재귀과정에 포함시키지 않아야 한다. 이미 partition 과정에서 정렬된 자신의 위치를 찾았기 때문이다.

#### Quick Sort's worst case

그렇다면 어떤 경우가 Worst Case 일까? Quick Sort 로 오름차순 정렬을 한다고 하자. 그렇다면 Worst Case 는 partition 과정에서 pivot value 가 항상 배열 내에서 가장 작은 값 또는 가장 큰 값으로 설정되었을 때이다. 매 partition 마다 `unbalanced partition`이 이뤄지고 이렇게 partition 이 되면 비교 횟수는 원소 n 개에 대해서 n 번, (n-1)번, (n-2)번 … 이 되므로 시간 복잡도는 **O(n^2)** 이 된다.

#### Balanced-partitioning

자연스럽게 Best-Case 는 두 개의 sub-problems 의 크기가 동일한 경우가 된다. 즉 partition 과정에서 반반씩 나뉘게 되는 경우인 것이다. 그렇다면 Partition 과정에서 pivot 을 어떻게 정할 것인가가 중요해진다. 어떻게 정하면 정확히 반반의 partition 이 아니더라도 balanced-partitioning 즉, 균형 잡힌 분할을 할 수 있을까? 배열의 맨 뒤 또는 맨 앞에 있는 원소로 설정하는가? Random 으로 설정하는 것은 어떨까? 특정 위치의 원소를 pivot 으로 설정하지 않고 배열 내의 원소 중 임의의 원소를 pivot 으로 설정하면 입력에 관계없이 일정한 수준의 성능을 얻을 수 있다. 또 악의적인 입력에 대해 성능 저하를 막을 수 있다.

#### Partitioning

정작 중요한 Partition 은 어떻게 이루어지는가에 대한 이야기를 하지 않았다. 가장 마지막 원소를 pivot 으로 설정했다고 가정하자. 이 pivot 의 값을 기준으로 좌측에는 작은 값 우측에는 큰 값이 오도록 해야 하는데, 일단 pivot 은 움직이지 말자. 첫번째 원소부터 비교하는데 만약 그 값이 pivot 보다 작다면 그대로 두고 크다면 맨 마지막에서 그 앞의 원소와 자리를 바꿔준다. 즉 pivot value 의 index 가 k 라면 k-1 번째와 바꿔주는 것이다. 이 모든 원소에 대해 실행하고 마지막 과정에서 작은 값들이 채워지는 인덱스를 가리키고 있는 값에 1 을 더한 index 값과 pivot 값을 바꿔준다. 즉, 최종적으로 결정될 pivot 의 인덱스를 i 라고 했을 때, 0 부터 i-1 까지는 pivot 보다 작은 값이 될 것이고 i+1 부터 k 까지는 pivot 값보다 큰 값이 될 것이다.

| Space Complexity | Time Complexity |
| :--------------: | :-------------: |
|       O(log(n))       |    O(nlogn)     |

#### [code](https://github.com/JaeYeopHan/algorithm_basic_java/blob/master/src/test/java/sort/QuickSort.java)

</br>

### non-Comparisons Sorting Algorithm

`Counting Sort`, `Radix Sort` 를 소개한다.

### Counting Sort

Count Sort 는 말 그대로 몇 개인지 개수를 세어 정렬하는 방식이다. 정렬하고자 하는 값 중 **최대값에 해당하는 값을 size 로 하는 임시 배열** 을 만든다. 만들어진 배열의 index 중 일부는 정렬하고자 하는 값들이 되므로 그 값에는 그 값들의 **개수** 를 나타낸다. 정렬하고자 하는 값들이 몇 개씩인지 파악하는 임시 배열이 만들어졌다면 이 임시 배열을 기준으로 정렬을 한다. 그 전에 임시 배열에서 한 가지 작업을 추가적으로 수행해주어야 하는데 큰 값부터 즉 큰 index 부터 시작하여 누적된 값으로 변경해주는 것이다. 이 누적된 값은 정렬하고자 하는 값들이 정렬될 index 값을 나타내게 된다. 작업을 마친 임시 배열의 index 는 정렬하고자 하는 값을 나타내고 value 는 정렬하고자 하는 값들이 정렬되었을 때의 index 를 나타내게 된다. 이를 기준으로 정렬을 해준다. 점수와 같이 0~100 으로 구성되는 좁은 범위에 존재하는 데이터들을 정렬할 때 유용하게 사용할 수 있다.

| Space Complexity | Time Complexity |
| :--------------: | :-------------: |
|       O(n)       |      O(n)       |

</br>

### Radix Sort

정렬 알고리즘의 한계는 O(n log n)이지만, 기수 정렬은 이 한계를 넘어설 수 있는 알고리즘이다. 단, 한 가지 단점이 존재하는데 적용할 수 있는 범위가 제한적이라는 것이다. 이 범위는 **데이터 길이** 에 의존하게 된다. 정렬하고자 하는 데이터의 길이가 동일하지 않은 데이터에 대해서는 정렬이 불가능하다. 숫자말고 문자열의 경우도 마찬가지이다. (불가능하다는 것은 기존의 정렬 알고리즘에 비해 기수 정렬 알고리즘으로는 좋은 성능을 내는데 불가능하다는 것이다.)

기수(radix)란 주어진 데이터를 구성하는 기본요소를 의미한다. 이 기수를 이용해서 정렬을 진행한다. 하나의 기수마다 하나의 버킷을 생성하여, 분류를 한 뒤에, 버킷 안에서 또 정렬을 하는 방식이다.

기수 정렬은 `LSD(Least Significant Digit)` 방식과 `MSD(Most Significant Digit)` 방식 두 가지로 나뉜다. LSD 는 덜 중요한 숫자부터 정렬하는 방식으로 예를 들어 숫자를 정렬한다고 했을 때, 일의 자리부터 정렬하는 방식이다. MSD 는 중요한 숫자부터 정렬하는 방식으로 세 자리 숫자면 백의 자리부터 정렬하는 방식이다.

두 가지 방식의 Big-O 는 동일하다. 하지만 주로 기수정렬을 이야기할 때는 LSD 를 이야기한다. LSD 는 중간에 정렬 결과를 볼 수 없다. 무조건 일의 자리부터 시작해서 백의 자리까지 모두 정렬이 끝나야 결과를 확인할 수 있고, 그 때서야 결과가 나온다. 하지만 MSD 는 정렬 중간에 정렬이 될 수 있다. 그러므로 정렬하는데 걸리는 시간을 줄일 수 있다. 하지만 정렬이 완료됬는지 확인하는 과정이 필요하고 이 때문에 메모리를 더 사용하게 된다. 또 상황마다 일관적인 정렬 알고리즘을 사용하여 정렬하는데 적용할 수 없으므로 불편하다. 이러한 이유들로 기수 정렬을 논할 때는 주로 LSD 에 대해서 논한다.

| Space Complexity | Time Complexity |
| :--------------: | :-------------: |
|       O(n)       |      O(n)       |

</br>

#### Sorting Algorithm's Complexity 정리

|   Algorithm    | Space Complexity | (average) Time Complexity | (worst) Time Complexity |
| :------------: | :--------------: | :-----------------------: | :---------------------: |
|  Bubble sort   |       O(1)       |          O(n^2)           |         O(n^2)          |
| Selection sort |       O(1)       |          O(n^2)           |         O(n^2)          |
| Insertion sort |       O(1)       |          O(n^2)           |         O(n^2)          |
|   Merge sort   |       O(n)       |         O(nlogn)          |        O(nlogn)         |
|   Heap sort    |       O(1)       |         O(nlogn)          |        O(nlogn)         |
|   Quick sort   |       O(1)       |         O(nlogn)          |         O(n^2)          |
|   Count sort   |       O(n)       |           O(n)            |          O(n)           |
|   Radix sort   |       O(n)       |           O(n)            |          O(n)           |

#### 더 읽을거리

* [Sorting Algorithm 을 비판적으로 바라보자](http://asfirstalways.tistory.com/338)

[뒤로](https://github.com/JaeYeopHan/for_beginner)/[위로](#algorithm)

</br>

## Prime Number Algorithm

소수란 양의 약수를 딱 두 개만 갖는 자연수를 소수라 부른다. 2, 3, 5, 7, 11, …이 그런 수들인데, 소수를 판별하는 방법으로 첫번째 어떤 수 N 이 소수인지 판별하기 위해서는 N 을 2 부터 N 보다 1 작은 수까지 나누어서 나머지가 0 인 경우가 있는지 검사하는 방법과 두번째로 `에라토스테네스의 체`를 사용할 수 있다.

### 에라토스테네스의 체 [Eratosthenes’ sieve]

`에라토스테네스의 체(Eratosthenes’ sieve)`는, 임의의 자연수에 대하여, 그 자연수 이하의 `소수(prime number)`를 모두 찾아 주는 방법이다. 입자의 크기가 서로 다른 가루들을 섞어 체에 거르면 특정 크기 이하의 가루들은 다 아래로 떨어지고, 그 이상의 것들만 체 위에 남는 것처럼, 에라토스테네스의 체를 사용하면 특정 자연수 이하의 합성수는 다 지워지고 소수들만 남는 것이다. 방법은 간단하다. 만일 `100` 이하의 소수를 모두 찾고 싶다면, `1` 부터 `100` 까지의 자연수를 모두 나열한 후, 먼저 소수도 합성수도 아닌 `1`을 지우고, `2`외의 `2`의 배수들을 다 지우고, `3`외의 `3`의 배수들을 다 지우고, `5`외의 `5`의 배수들을 지우는 등의 이 과정을 의 `100`제곱근인 `10`이하의 소수들에 대해서만 반복하면, 이때 남은 수들이 구하고자 하는 소수들이다.</br>

에라토스테네스의 체를 이용하여 50 까지의 소수를 구하는 순서를 그림으로 표현하면 다음과 같다.</br>

1.  초기 상태

|  1  |  2  |  3  |  4  |  5  |  6  |  7  |  8  |  9  | 10  |
| :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: |
| 11  | 12  | 13  | 14  | 15  | 16  | 17  | 18  | 19  | 20  |
| 21  | 22  | 23  | 24  | 25  | 26  | 27  | 28  | 29  | 30  |
| 31  | 32  | 33  | 34  | 35  | 36  | 37  | 38  | 39  | 40  |
| 41  | 42  | 43  | 44  | 45  | 46  | 47  | 48  | 49  | 50  |

2.  소수도 합성수도 아닌 1 제거

|  x  |  2  |  3  |  4  |  5  |  6  |  7  |  8  |  9  | 10  |
| :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: |
| 11  | 12  | 13  | 14  | 15  | 16  | 17  | 18  | 19  | 20  |
| 21  | 22  | 23  | 24  | 25  | 26  | 27  | 28  | 29  | 30  |
| 31  | 32  | 33  | 34  | 35  | 36  | 37  | 38  | 39  | 40  |
| 41  | 42  | 43  | 44  | 45  | 46  | 47  | 48  | 49  | 50  |

3.  2 외의 2 의 배수들을 제거

|  x  |  2  |  3  |  x  |  5  |  x  |  7  |  x  |  9  |  x  |
| :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: |
| 11  |  x  | 13  |  x  | 15  |  x  | 17  |  x  | 19  |  x  |
| 21  |  x  | 23  |  x  | 25  |  x  | 27  |  x  | 29  |  x  |
| 31  |  x  | 33  |  x  | 35  |  x  | 37  |  x  | 39  |  x  |
| 41  |  x  | 43  |  x  | 45  |  x  | 47  |  x  | 49  |  x  |

4.  3 외의 3 의 배수들을 제거

|  x  |  2  |  3  |  x  |  5  |  x  |  7  |  x  |  x  |  x  |
| :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: |
| 11  |  x  | 13  |  x  |  x  |  x  | 17  |  x  | 19  |  x  |
|  x  |  x  | 23  |  x  | 25  |  x  |  x  |  x  | 29  |  x  |
| 31  |  x  |  x  |  x  | 35  |  x  | 37  |  x  |  x  |  x  |
| 41  |  x  | 43  |  x  |  x  |  x  | 47  |  x  | 49  |  x  |

5.  5 외의 5 의 배수들을 제거

|  x  |  2  |  3  |  x  |  5  |  x  |  7  |  x  |  x  |  x  |
| :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: |
| 11  |  x  | 13  |  x  |  x  |  x  | 17  |  x  | 19  |  x  |
|  x  |  x  | 23  |  x  |  x  |  x  |  x  |  x  | 29  |  x  |
| 31  |  x  |  x  |  x  |  x  |  x  | 37  |  x  |  x  |  x  |
| 41  |  x  | 43  |  x  |  x  |  x  | 47  |  x  | 49  |  x  |

6.  7 외의 7 의 배수들을 제거(50 이하의 소수 판별 완료)

|  x  |  2  |  3  |  x  |  5  |  x  |  7  |  x  |  x  |  x  |
| :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: |
| 11  |  x  | 13  |  x  |  x  |  x  | 17  |  x  | 19  |  x  |
|  x  |  x  | 23  |  x  |  x  |  x  |  x  |  x  | 29  |  x  |
| 31  |  x  |  x  |  x  |  x  |  x  | 37  |  x  |  x  |  x  |
| 41  |  x  | 43  |  x  |  x  |  x  | 47  |  x  |  x  |  x  |

| Space Complexity | Time Complexity |
| :--------------: | :-------------: |
|       O(n)       |   O(loglogn)    |

#### [code](https://github.com/alstn2468/BaekJoon_Online_Judge/blob/master/1900~1999/1929.c)

[뒤로](https://github.com/JaeYeopHan/for_beginner)/[위로](#algorithm)

</br>

#### Time Complexity

O(1) < O(log N) < O(N) < O(N log N) < O(N^2) < O(N^3)

O(2^N) : 크기가 N 인 집합의 부분 집합

O(N!) : 크기가 N 인 순열

#### 알고리즘 문제 연습 사이트

* https://algospot.com/
* https://codeforces.com
* http://topcoder.com
* https://www.acmicpc.net/
* https://leetcode.com/problemset/algorithms/
* https://programmers.co.kr/learn/challenges
* https://www.hackerrank.com
* http://codingdojang.com/
* http://codeup.kr/JudgeOnline/index.php
* http://euler.synap.co.kr/
* http://koistudy.net
* https://www.codewars.com
* https://app.codility.com/programmers/
* http://euler.synap.co.kr/
* https://swexpertacademy.com/
* https://www.codeground.org/
* https://onlinejudge.org/

[뒤로](https://github.com/JaeYeopHan/for_beginner)/[위로](#algorithm)

</br>

</br>

_Algorithm.end_
