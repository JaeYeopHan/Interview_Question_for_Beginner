# Part 3-2 iOS

> 면접에서 나왔던 질문들을 정리했으며 디테일한 모든 내용을 다루기보단 전체적인 틀을 다뤘으며, 틀린 내용이 있을 수도 있으니 비판적으로 찾아보면서 공부하는 것을 추천드립니다. iOS 면접을 준비하시는 분들에게 조금이나마 도움이 되길 바라겠습니다.

* App Life Cycle
* View Life Cycle
* Delegate vs Block vs Notification
* Memory Management
* assign vs weak
* Frame vs Bounds
* 기타 질문

</br>

## App Life Cycle

iOS 에서 앱은 간단하게 3 가지 실행 모드와 5 가지의 상태로 구분이 가능하며 항상 하나의 상태를 가지고 있습니다.

* Not Running
  * 실행되지 않는 모드와 상태를 모두 의미합니다.
* Foreground
  * Active
  * Inactive
* Background
  * Running
  * Suspend

어떻게 보면 필요없어 보일 수도 있지만 이를 이해하는 것은 앱이 복잡해질수록 중요합니다.

* Not Running >> Active
  * 앱을 터치해서 실행이 되는 상태입니다.
* Active >> Inactive >> Running
  * 앱을 활성화 상태에서 비활성화 상태로 만든 뒤, 백그라운드에서도 계속 실행중인 상태입니다.
* Active >> Inactive >> Suspend
  * 앱을 활성화 상태에서 비활성화 상태로 만든 뒤, 백그라운드에서도 정지되어 있는 상태입니다.
* Running >> Active
  * 백그라운드에서 실행 중인 앱이 다시 포어그라운드에서 활성화되는 상태입니다.

이렇게 5 가지의 전환을 가지고 앱의 라이프 사이클이 이루어 지게 됩니다. 이러한 전환을 가능하게 하는 메소드들이 있지만 이를 외우고 있기보단 앱 라이프 사이클을 이해하는 것이 중요하다고 생각해서 필요하신 분들은 찾아보는 것을 추천드립니다.

```
Q : Suspend >> Running >> Active는 안될까요?
A : 넵! 안됩니다^^
```

**Reference**

* https://developer.apple.com/library/content/documentation/iPhone/Conceptual/iPhoneOSProgrammingGuide/TheAppLifeCycle/TheAppLifeCycle.html#//apple_ref/doc/uid/TP40007072-CH2-SW1

</br>

[뒤로](https://github.com/JaeYeopHan/for_beginner)/[위로](#part-3-2-ios)

</br>

## View Life Cycle

앱은 하나 이상의 뷰로 구성이 되어 있으며, 각각의 뷰들은 라이프 사이클을 가지고 있습니다. 따라서 뷰의 라이프 사이클을 고려해서 로직을 넣고, 구성해야 합니다.

![view life cycle](https://docs-assets.developer.apple.com/published/f06f30fa63/UIViewController_Class_Reference_2x_ddcaa00c-87d8-4c85-961e-ccfb9fa4aac2.png)

각각의 메소드를 보면 네이밍이 비슷하고 Did 와 Will 의 차이가 있는 것을 알 수 있습니다. 하나씩 살펴보겠습니다.

* ViewDidLoad : 뷰 컨트롤러 클래스가 생성될 때, 가장 먼저 실행됩니다. 특별한 경우가 아니라면 **딱 한 번** 실행되기 때문에 초기화 할 때 사용 할 수 있습니다.
* ViewWillAppear : 뷰가 생성되기 직전에 **항상** 실행이 되기 때문에 뷰가 나타나기 전에 실행해야 하는 작업들을 여기서 할 수 있습니다.
* ViewDidAppear : 뷰가 생성되고 난 뒤에 실행 됩니다. 데이터를 받아서 화면에 뿌려주거나 애니메이션 등의 작업을 하는 로직을 위치시킬 수 있습니다. ViewWillAppear 에서 로직을 넣었다가 뷰에 반영이 안되는 경우가 있기 때문입니다.
* ViewWillDisappear : 뷰가 사라지기 직전에 실행 됩니다.
* ViewDidDisappear : 뷰가 사라지고 난 뒤에 실행 됩니다.

순환적으로 발생하기 때문에 화면 전환에 따라 발생해야 하는 로직을 적절한 곳에서 실행시켜야 합니다.

**Reference**

* https://developer.apple.com/documentation/uikit/uiviewcontroller

</br>

[뒤로](https://github.com/JaeYeopHan/for_beginner)/[위로](#part-3-2-ios)

</br>

## Delegate vs Block vs Notification

Delegate 는 객체 간의 데이터 통신을 할 경우 전달자 역할을 합니다. 델리게이트는 이벤트 처리할 때 많이 사용하게 되는데 특정 객체에서 발생한 이벤트를 다른 객체에게 통보할 수 있도록 해줍니다. Delegate 에게 알릴 수 있는 것은 여러 이벤트가 있거나 클래스가 델리게이트로부터 데이터를 가져와야 할 때 사용하게 됩니다. 가장 기본적인 예는 `UITableView` 입니다.

Block 은 이벤트가 딱 하나일 때 사용하기 좋습니다. Completion block 을 사용하는 것이 좋은 예로 `NSURLConnection sendAsynchronousRequest:queue:completionHandler:`가 있습니다.

Delegate 와 block 은 이벤트에 대해 하나의 리스너가 있을 때 사용하는 것이 좋으며 재사용하는 경우에는 클래스 기반의 delegate 를 사용하는 것이 좋습니다.

Notification 은 이벤트에 대해 여러 리스너가 있을 때 사용하면 좋습니다. 예를 들어 UI 가 특정 이벤트를 기반으로 정보를 표시하는 방법을 notification 으로 브로드 캐스팅하여 변경하거나 문서 창을 닫을 때 문서의 객체가 상태를 저장하는지 확인하는 방법으로 notification 을 사용할 수 있습니다. Notification 의 일반적인 목적은 다른 객체에 이벤트를 알리면 적절하게 응답 할 수 있습니다. 그러나 noti 를 받는 객체는 이벤트가 발생한 후에만 반응 할 수 있습니다.

</br>

[뒤로](https://github.com/JaeYeopHan/for_beginner)/[위로](#part-3-2-ios)

</br>

## Memory Management

* 정리해놓은 글을 통해 설명하는 것이 좋다고 판단되어 예전에 정리한 글을 공유합니다.
* https://github.com/Yongjai/TIL/blob/master/iOS/Objective-C/MemoryManagement.md/

* 스위프트는 ARC로 메모리 관리를 한다.
  * ARC : 자동 참조 계수(ARC: Automatic Reference Counting)를 뜻하며, 인스턴스가 더 이상 필요없을 때 사용된 메모리를 자동으로 해제해준다.
  * 강한 순환 참조 : 강환 순환 참조는 ARC로 메모리를 관리할 때 발생할 수 있는 문제이다. 두 개의 객체가 서로 강한 참조를 하는 경우 발생할 수 있다.
  * 강한 순환 참조의 해결법 : 서로 강한 참조를 하는 경우 발생한다면, 둘 중 하나의 강한 참조를 변경해주면 된다. 강한 참조를 **약한(weak) 참조** 혹은 **미소유(unowned) 참조**로 변경하면 강한 순환 참조 문제를 해결할 수 있다. 약한 참조는 옵셔널일 때 사용하고, 미소유 참조는 옵셔널이 아닐 때 사용한다.

**Reference**

* 애플 공식문서
  * [애플 개발문서 Language Guide - Automatic Reference Counting](https://docs.swift.org/swift-book/LanguageGuide/AutomaticReferenceCounting.html#//apple_ref/doc/uid/TP40014097-CH20-ID48)


* 블로그
  * [메모리 관리 ARC](http://jhyejun.com/blog/memory-management-arc)
  * [weak와 unowned의 사용법](http://jhyejun.com/blog/how-to-use-weak-and-unowned)
  * [클로저에서의 강한 순환 참조](http://jhyejun.com/blog/strong-reference-cycles-in-closure)

</br>

[뒤로](https://github.com/JaeYeopHan/for_beginner)/[위로](#part-3-2-ios)

</br>

## assign vs weak

* assign : 객체의 retain count 를 증가시키지 않습니다. 외부에서 retain count 를 감소시켜 객체가 소멸될수 있기 때문에 int 와 같은 primitive type 에 적합합니다.
* weak : assign 과 거의 동일하지만 assign 은 객체가 소멸되어도 포인터 값이 변하지 않습니다. weak 는 객체가 해제되는 시점에 포인터값이 nil 이 됩니다. assign 의 문제점은 객체가 해제되어도 포인터값이 남아있어 접근하려다 죽는 경우가 생긴다는 점입니다. Objective-C 는 기본적으로 nil 에 접근할때는 에러가 발생하지 않습니다.

```
Q : weak는 언제 dealloc 될까요?
A : 마지막 강한 참조가 더 이상 객체를 가리키지 않으면 객체는 할당이 해제되고 모든 약한 참조는 dealloc 됩니다.
```

</br>

[뒤로](https://github.com/JaeYeopHan/for_beginner)/[위로](#part-3-2-ios)

</br>

## Frame vs Bounds

* Frame : 부모뷰의 상대적인 위치(x, y) 및 크기 (너비, 높이)로 표현되는 사각형입니다.
* Bounds : 자체 좌표계 (0,0)를 기준으로 위치 (x, y) 및 크기 (너비, 높이)로 표현되는 사각형입니다.

</br>

[뒤로](https://github.com/JaeYeopHan/for_beginner)/[위로](#part-3-2-ios)

</br>

## 기타 질문

* 블록 객체는 어디에 생성되는가?
  * 힙 vs 스택

- 오토레이아웃을 코드로 작성해보았는가?

  * 실제 면접에서 다음과 같이 답변하였습니다.

    ```
    코드로 작성해본 적은 없지만 비쥬얼 포맷을 이용해서 작성할 수 있다는 것을 알고 있습니다.
    ```

- @property 로 프로퍼티를 선언했을때, \_와 .연산자로 접근하는 것의 차이점

  * \_ 는 인스턴스 변수에 직접 접근하는 연산자 입니다.
  * . 은 getter 메소드 호출을 간단하게 표현한 것 입니다.

- Init 메소드에서 .연산자를 써도 될까요?

  * 불가능 합니다. 객체가 초기화도 안되어 있기 때문에 getter 메소드 호출 불가합니다.

- 데이터를 저장하는 방법

  > 각각의 방법들에 대한 장단점과 언제 어떻게 사용해야 하는지를 이해하는 것이 필요합니다.

  * Server/Cloud
  * Property List
  * Archive
  * SQLite
  * File
  * CoreData
  * Etc...

- Dynamic Binding

  > 동적 바인딩은 컴파일 타임이 아닌 런타임에 메시지 메소드 연결을 이동시킵니다. 그래서 이 기능을 사용하면 응답하지 않을 수도 있는 객체로 메시지를 보낼 수 있습니다. 개발에 유연성을 가져다 주지만 런타임에는 가끔 충돌을 발생시킵니다.

- Block 에서의 순환 참조 관련 질문

  > 순환 참조에서 weak self 로만 처리하면 되는가에 대한 문제였는데 자세한 내용은 기억이 나지 않습니다.

- 손코딩

  > 일반적인 코딩 문제와 iOS 와 관련된 문제들

</br>

[뒤로](https://github.com/JaeYeopHan/for_beginner)/[위로](#part-3-2-ios)

</br>
