# Part 2-2 JavaScript
* [JavaScript Event Loop](#javascript-event-loop)
* [Hoisting](#hoisting)
* [Closure](#closure)
* [this에 대해서](#this에-대해서)
* Array-Like Object
* Promise

[뒤로](https://github.com/JaeYeopHan/for_beginner)

## JavaScript Event Loop
그림과 함께 설명을 하면 좀 더 이해가 쉬울 것 같아 따로 정리한 포스팅으로 대체합니다.  
[JavaScript 이벤트 루프에 대해서](http://asfirstalways.tistory.com/362)

[뒤로](https://github.com/JaeYeopHan/for_beginner)/[위로](#part-2-2-javascript)

</br>

## Hoisting
_ES6 문법이 표준화가 되면서 크게 신경쓰지 않아도 되는 부분이 되었지만, JavaScript라는 언어의 특성을 가장 잘 보여주는 특성 중 하나이기에 정리했습니다._

### 정의
`hoist` 라는 단어의 사전적 정의는 끌어올리기 라는 뜻이다. 자바스크립트에서 끌어올려지는 것은 변수이다. `var` keyword로 선언된 모든 변수 선언은 **호이스트** 된다. 호이스트란 변수의 정의가 그 범위에 따라 `선언`과 `할당`으로 분리되는 것을 의미한다. 즉, 변수가 함수 내에서 정의되었을 경우, 선언이 함수의 최상위로, 함수 바깥에서 정의되었을 경우, 전역 컨텍스트의 최상위로 변경이 된다.

우선, 선언(Declaration)과 할당(Assignment)을 이해해야 한다. 끌어올려지는 것은 선언이다.

```js
function getX(){
  console.log(x); // undefined
  var x = 100;
  console.log(x); // 100
}
getX();
```
다른 언어의 경우엔, 변수 x를 선언하지 않고 출력하려 한다면 오류를 발생할 것이다. 하지만 자바스크립트에서는 `undefined`라고 하고 넘어간다. `var x = 100;` 이 구문에서 `var x;`를 호이스트하기 때문이다. 즉, 작동 순서에 맞게 코드를 재구성하면 다음과 같다.
```js
function getX(){
  var x;
  console.log(x);
  x = 100;
  console.log(x);
}
getX();
```
선언문은 항시 자바스크립트 엔진 구동시 가장 최우선으로 해석하고 **할당 구문은 런타임 과정에서 이루어지기 때문에,** 호이스팅 되지 않는다.

함수가 자신이 위치한 코드에 상관없이 함수 선언문 형태로 정의한 함수의 유효범위는 전체 코드의 맨 처음부터 시작한다. 함수 선언이 함수 실행 부분보다 뒤에 있더라도 자바스크립트 엔진이 함수 선언을 끌어올리는 것을 의미한다. 함수 호이스팅은 함수를 끌어올리지만 변수의 값은 끌어올리지 않는다.
```js
foo( );
function foo( ){
  console.log(‘hello’);
};
// console> hello
```
foo 함수에 대한 선언을 호이스팅하여 global 객체에 등록시키기 때문에 `hello`가 제대로 출력된다.
```js
foo( );
var foo = function( ) {
  console.log(‘hello’);
};
// console> Syntax Error
```
이 두번째 예제의 함수 표현은 함수 리터럴을 할당하는 구조이기 때문에 호이스팅 되지 않으며 그렇기 때문에 `Syntax Error`를 발생시킨다.

[뒤로](https://github.com/JaeYeopHan/for_beginner)/[위로](#part-2-2-javascript)

</br>

## Closure
Closure(클로저)는 **두 개의 함수로 만들어진 환경** 으로 이루어진 특별한 객체의 한 종류이다. 여기서 **환경** 이라 함은 클로저가 생성될 때 그 **범위** 에 있던 여러 지역 변수들이 포함된 `context`를 말한다. 이 클로저를 통해서 자바스크립트에는 없는 비공개(private) 속성/메소드, 공개 속성/메소드를 구현할 수 있는 방안을 마련할 수 있다.

### 클로저 생성하기
다음은 클로저가 생성되는 조건이다.
1) 내부 함수가 익명 함수로 되어 외부 함수의 반환값으로 사용된다.
2) 내부 함수는 외부 함수의 실행 환경(execution environment)에서 실행된다.
3) 내부 함수에서 사용되는 변수 x는 외부 함수의 변수 스코프에 있다.

```js
function outer() {
  var name = `closure`;
  function inner() {
    console.log(name);
  }
  inner();
}
outer();
// console> closure
```
`outer`함수를 실행시키는 `context`에는 `name`이라는 변수가 존재하지 않는다는 것을 확인할 수 있다. 비슷한 맥락에서 코드를 조금 변경해볼 수 있다.

```js
var name = `Warning`;
function outer( ) {
  var name = `closure`;
  return function inner( ) {
    console.log(name);
  }
}

var callFunc = outer();
callFunc();
// console> closure
```
위 코드에서 `callFunc`를 클로저라고 한다. `callFunc` 호출에 의해 `name`이라는 값이 console에 찍히는데, 찍히는 값은 `Warning`이 아니라 `closure`라는 값이다. 즉, `outer` 함수의 context에 속해있는 변수를 참조하는 것이다. 여기서 `outer`함수의 지역변수로 존재하는 `name`변수를 `free variable(자유변수)`라고 한다.

이처럼 외부 함수 호출이 종료되더라도 외부 함수의 지역 변수 및 변수 스코프 객체의 체인 관계를 유지할 수 있는 구조를 클로저라고 한다. 보다 정확히는 외부 함수에 의해 반환되는 내부 함수를 가리키는 말이다.

#### Reference
* [TOAST meetup - 자바스크립트의 스코프와 클로저](http://meetup.toast.com/posts/86)

[뒤로](https://github.com/JaeYeopHan/for_beginner)/[위로](#part-2-2-javascript)

</br>

## this에 대해서
자바스크립트에서 모든 함수는 실행될 때마다 함수 내부에 `this`라는 객체가 추가된다. `arguments`라는 유사 배열 객체와 함께 함수 내부로 암묵적으로 전달되는 것이다. 그렇기 때문에 자바스크립트에서의 `this`는 함수가 호출된 상황에 따라 그 모습을 달리한다.

### 상황 1. 객체의 메서드를 호출할 때
객체의 프로퍼티가 함수일 경우 메서드라고 부른다. `this`는 함수를 실행할 때 함수를 소유하고 있는 객체(메소드를 포함하고 있는 인스턴스)를 참조한다. 즉 해당 메서드를 호출한 객체로 바인딩된다. `A.B`일 때 `B`함수 내부에서의 `this`는 `A`를 가리키는 것이다.
```js
var myObject = {
  name: 'foo',
  sayName: function() {
    console.log(this);
  }
}
myObject.sayName();
// console> Object {name: "foo"}
```

</br>

### 상황 2. 함수를 호출할 때
특정 객체의 메서드가 아니라 함수를 호출하면, 해당 함수 내부 코드에서 사용된 this 는 전역객체에 바인딩 된다. `A.B`일 때 `A`가 전역 객체가 되므로 `B`함수 내부에서의 `this`는 당연히 전역 객체에 바인딩 되는 것이다.
```js
var value = 100;
var myObj = {
  value: 1,
  func1: function() {
    console.log(`func1's this.value: ${this.value}`);

    var func2 = function() {
      console.log(`func2's this.value ${this.value}`);
    };
    func2();
  }
};

myObj.func1();
// console> func1's this.value: 1
// console> func2's this.value: 100
```
`func1`에서의 `this`는 **상황1** 과 같다. 그렇기 때문에 `myObj`가 `this`로 바인딩되고 `myObj`의 `value`인 1이 console에 찍히게 된다. 하지만 `func`는 **상황2** 로 해석해야 한다. `A.B`구조에서 `A`가 없기 때문에 함수 내부에서 `this`가 전역 객체를 참조하게 되고 `value`는 100이 되는 것이다.

</br>

### 상황 3. 생성자 함수를 통해 객체를 생성할 때
그냥 함수를 호출하는 것이 아니라 `new`키워드를 통해 생성자 함수를 호출할 때는 또 `this`가 다르게 바인딩 된다. `new` 키워드를 통해서 호출된 함수 내부에서의 `this`는 객체 자신이 된다. 생성자 함수를 호출할 때의 `this` 바인딩은 생성자 함수가 동작하는 방식을 통해 이해할 수 있다.

`new` 연산자를 통해 함수를 생성자로 호출하게 되면, 일단 빈 객체가 생성되고 this가 바인딩 된다. 이 객체는 함수를 통해 생성된 객체이며, 자신의 부모인 프로토타입 객체와 연결되어 있다. 그리고 return 문이 명시되어 있지 않은 경우에는 `this`로 바인딩 된 새로 생성한 객체가 리턴된다.

```js
var Person = function(name){
    console.log(this);
    this.name = name;
};

var foo = new Person('foo');// Person
console.log(foo.name);// foo
```

</br>

### 상황 4. apply, call, bind를 통한 호출
상황1, 상황2, 상황3에 의존하지 않고 `this`를 자바스크립트 코드로 주입 또는 설정할 수 있는 방법이다. 상황2에서 사용했던 예제 코드를 다시 한 번 보고 오자. `func2`를 호출할 때, `func1`에서의 this를 주입하기 위해서 위 세가지 메소드를 사용할 수 있다. 그리고 세 메소드의 차이점을 파악하기 위해 `func2`에 파라미터를 받을 수 있도록 수정한다.

* `bind` 메소드 사용
```js
var value = 100;
var myObj = {
  value: 1,
  func1: function() {
    console.log(`func1's this.value: ${this.value}`);

    var func2 = function(val1, val2) {
      console.log(`func2's this.value ${this.value} and ${val1} and ${val2}`);
    }.bind(this, `param1`, `param2`);
    func2();
  }
};

myObj.func1();
// console> func1's this.value: 1
// console> func2's this.value: 1 and param1 and param2
```

* `call` 메소드 사용
```js
var value = 100;
var myObj = {
  value: 1,
  func1: function() {
    console.log(`func1's this.value: ${this.value}`);

    var func2 = function(val1, val2) {
      console.log(`func2's this.value ${this.value} and ${val1} and ${val2}`);
    };
    func2.call(this, `param1`, `param2`);
  }
};

myObj.func1();
// console> func1's this.value: 1
// console> func2's this.value: 1 and param1 and param2
```

* `apply` 메소드 사용
```js
var value = 100;
var myObj = {
  value: 1,
  func1: function() {
    console.log(`func1's this.value: ${this.value}`);

    var func2 = function(val1, val2) {
      console.log(`func2's this.value ${this.value} and ${val1} and ${val2}`);
    };
    func2.apply(this, [`param1`, `param2`]);
  }
};

myObj.func1();
// console> func1's this.value: 1
// console> func2's this.value: 1 and param1 and param2
```

* `bind` vs `apply`, `call`
우선 `bind`는 함수를 선언할 때, `this`와 파라미터를 지정해줄 수 있으며, `call`과 `apply`는 함수를 호출할 때, `this`와 파라미터를 지정해준다.

* `apply` vs `bind`, `call`
`apply` 메소드에는 첫번째 인자로 `this`를 넘겨주고 두번째 인자로 넘겨줘야 하는 파라미터를 배열의 형태로 전달한다. `bind`메소드와 `call`메소드는 각각의 파라미터를 하나씩 넘겨주는 형태이다.

[뒤로](https://github.com/JaeYeopHan/for_beginner)/[위로](#part-2-2-javascript)

</br>

## (Title)
Content








[뒤로](https://github.com/JaeYeopHan/for_beginner)/[위로](#part-2-2-javascript)

</br>

### Personal Recommendation
* [ECMAScript6 학습하기](https://jaeyeophan.github.io/categories/ECMAScript6)


[뒤로](https://github.com/JaeYeopHan/for_beginner)/[위로](#part-2-2-javascript)

</br>

</br>

_JavaScript.end_  
