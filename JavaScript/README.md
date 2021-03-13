# Part 2-2 JavaScript

* [JavaScript Event Loop](#javascript-event-loop)
* [Hoisting](#hoisting)
* [Closure](#closure)
* [this 에 대해서](#this-에-대해서)
* [Promise](#promise)
* [Arrow Function](#arrow-function)

[뒤로](https://github.com/JaeYeopHan/for_beginner)

## JavaScript Event Loop

그림과 함께 설명을 하면 좀 더 이해가 쉬울 것 같아 따로 정리한 포스팅으로 대체합니다.

* [JavaScript 이벤트 루프에 대해서](http://asfirstalways.tistory.com/362)
* [자바스크립트의 비동기 처리 과정](http://sculove.github.io/blog/2018/01/18/javascriptflow/)

[뒤로](https://github.com/JaeYeopHan/for_beginner)/[위로](#part-2-2-javascript)

</br>

## Hoisting

_ES6 문법이 표준화가 되면서 크게 신경쓰지 않아도 되는 부분이 되었지만, JavaScript 라는 언어의 특성을 가장 잘 보여주는 특성 중 하나이기에 정리했습니다._

### 정의

`hoist` 라는 단어의 사전적 정의는 끌어올리기 라는 뜻이다. 자바스크립트에서 끌어올려지는 것은 변수이다. `var` keyword 로 선언된 모든 변수 선언은 **호이스트** 된다. 호이스트란 변수의 정의가 그 범위에 따라 `선언`과 `할당`으로 분리되는 것을 의미한다. 즉, 변수가 함수 내에서 정의되었을 경우, 선언이 함수의 최상위로, 함수 바깥에서 정의되었을 경우, 전역 컨텍스트의 최상위로 변경이 된다.

우선, 선언(Declaration)과 할당(Assignment)을 이해해야 한다. 끌어올려지는 것은 선언이다.

```js
function getX() {
  console.log(x); // undefined
  var x = 100;
  console.log(x); // 100
}
getX();
```

다른 언어의 경우엔, 변수 x 를 선언하지 않고 출력하려 한다면 오류를 발생할 것이다. 하지만 자바스크립트에서는 `undefined`라고 하고 넘어간다. `var x = 100;` 이 구문에서 `var x;`를 호이스트하기 때문이다. 즉, 작동 순서에 맞게 코드를 재구성하면 다음과 같다.

```js
function getX() {
  var x;
  console.log(x);
  x = 100;
  console.log(x);
}
getX();
```

선언문은 항시 자바스크립트 엔진 구동시 가장 최우선으로 해석하므로 호이스팅 되고, **할당 구문은 런타임 과정에서 이루어지기 때문에** 호이스팅 되지 않는다.

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
// console> Uncaught TypeError: foo is not a function
```

이 두번째 예제의 함수 표현은 함수 리터럴을 할당하는 구조이기 때문에 호이스팅 되지 않으며 그렇기 때문에 런타임 환경에서 `Type Error`를 발생시킨다.

[뒤로](https://github.com/JaeYeopHan/for_beginner)/[위로](#part-2-2-javascript)

</br>

## Closure

Closure(클로저)는 **두 개의 함수로 만들어진 환경** 으로 이루어진 특별한 객체의 한 종류이다. 여기서 **환경** 이라 함은 클로저가 생성될 때 그 **범위** 에 있던 여러 지역 변수들이 포함된 `context`를 말한다. 이 클로저를 통해서 자바스크립트에는 없는 비공개(private) 속성/메소드, 공개 속성/메소드를 구현할 수 있는 방안을 마련할 수 있다.

### 클로저 생성하기

다음은 클로저가 생성되는 조건이다.

1.  내부 함수가 익명 함수로 되어 외부 함수의 반환값으로 사용된다.
2.  내부 함수는 외부 함수의 실행 환경(execution environment)에서 실행된다.
3.  내부 함수에서 사용되는 변수 x 는 외부 함수의 변수 스코프에 있다.

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
function outer() {
  var name = `closure`;
  return function inner() {
    console.log(name);
  };
}

var callFunc = outer();
callFunc();
// console> closure
```

위 코드에서 `callFunc`를 클로저라고 한다. `callFunc` 호출에 의해 `name`이라는 값이 console 에 찍히는데, 찍히는 값은 `Warning`이 아니라 `closure`라는 값이다. 즉, `outer` 함수의 context 에 속해있는 변수를 참조하는 것이다. 여기서 `outer`함수의 지역변수로 존재하는 `name`변수를 `free variable(자유변수)`라고 한다.

이처럼 외부 함수 호출이 종료되더라도 외부 함수의 지역 변수 및 변수 스코프 객체의 체인 관계를 유지할 수 있는 구조를 클로저라고 한다. 보다 정확히는 외부 함수에 의해 반환되는 내부 함수를 가리키는 말이다.

#### Reference

* [TOAST meetup - 자바스크립트의 스코프와 클로저](http://meetup.toast.com/posts/86)

[뒤로](https://github.com/JaeYeopHan/for_beginner)/[위로](#part-2-2-javascript)

</br>

## this 에 대해서

자바스크립트에서 모든 함수는 실행될 때마다 함수 내부에 `this`라는 객체가 추가된다. `arguments`라는 유사 배열 객체와 함께 함수 내부로 암묵적으로 전달되는 것이다. 그렇기 때문에 자바스크립트에서의 `this`는 함수가 호출된 상황에 따라 그 모습을 달리한다.

### 상황 1. 객체의 메서드를 호출할 때

객체의 프로퍼티가 함수일 경우 메서드라고 부른다. `this`는 함수를 실행할 때 함수를 소유하고 있는 객체(메소드를 포함하고 있는 인스턴스)를 참조한다. 즉 해당 메서드를 호출한 객체로 바인딩된다. `A.B`일 때 `B`함수 내부에서의 `this`는 `A`를 가리키는 것이다.

```js
var myObject = {
  name: "foo",
  sayName: function() {
    console.log(this);
  }
};
myObject.sayName();
// console> Object {name: "foo", sayName: sayName()}
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

`func1`에서의 `this`는 **상황 1** 과 같다. 그렇기 때문에 `myObj`가 `this`로 바인딩되고 `myObj`의 `value`인 1 이 console 에 찍히게 된다. 하지만 `func2`는 **상황 2** 로 해석해야 한다. `A.B`구조에서 `A`가 없기 때문에 함수 내부에서 `this`가 전역 객체를 참조하게 되고 `value`는 100 이 되는 것이다.

</br>

### 상황 3. 생성자 함수를 통해 객체를 생성할 때

그냥 함수를 호출하는 것이 아니라 `new`키워드를 통해 생성자 함수를 호출할 때는 또 `this`가 다르게 바인딩 된다. `new` 키워드를 통해서 호출된 함수 내부에서의 `this`는 객체 자신이 된다. 생성자 함수를 호출할 때의 `this` 바인딩은 생성자 함수가 동작하는 방식을 통해 이해할 수 있다.

`new` 연산자를 통해 함수를 생성자로 호출하게 되면, 일단 빈 객체가 생성되고 this 가 바인딩 된다. 이 객체는 함수를 통해 생성된 객체이며, 자신의 부모인 프로토타입 객체와 연결되어 있다. 그리고 return 문이 명시되어 있지 않은 경우에는 `this`로 바인딩 된 새로 생성한 객체가 리턴된다.

```js
var Person = function(name) {
  console.log(this);
  this.name = name;
};

var foo = new Person("foo"); // Person
console.log(foo.name); // foo
```

</br>

### 상황 4. apply, call, bind 를 통한 호출

상황 1, 상황 2, 상황 3 에 의존하지 않고 `this`를 자바스크립트 코드로 주입 또는 설정할 수 있는 방법이다. 상황 2 에서 사용했던 예제 코드를 다시 한 번 보고 오자. `func2`를 호출할 때, `func1`에서의 this 를 주입하기 위해서 위 세가지 메소드를 사용할 수 있다. 그리고 세 메소드의 차이점을 파악하기 위해 `func2`에 파라미터를 받을 수 있도록 수정한다.

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

## Promise

Javascript 에서는 대부분의 작업들이 비동기로 이루어진다. 콜백 함수로 처리하면 되는 문제였지만 요즘에는 프론트엔드의 규모가 커지면서 코드의 복잡도가 높아지는 상황이 발생하였다. 이러면서 콜백이 중첩되는 경우가 따라서 발생하였고, 이를 해결할 방안으로 등장한 것이 Promise 패턴이다. Promise 패턴을 사용하면 비동기 작업들을 순차적으로 진행하거나, 병렬로 진행하는 등의 컨트롤이 보다 수월해진다. 또한 예외처리에 대한 구조가 존재하기 때문에 오류 처리 등에 대해 보다 가시적으로 관리할 수 있다. 이 Promise 패턴은 ECMAScript6 스펙에 정식으로 포함되었다.

#### Reference

* http://programmingsummaries.tistory.com/325
* https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Promise
* https://developers.google.com/web/fundamentals/getting-started/primers/promises?hl=ko

[뒤로](https://github.com/JaeYeopHan/for_beginner)/[위로](#part-2-2-javascript)

</br>

### Personal Recommendation

* [ECMAScript6 학습하기](https://jaeyeophan.github.io/categories/ECMAScript6)

[뒤로](https://github.com/JaeYeopHan/for_beginner)/[위로](#part-2-2-javascript)

</br>

## Async/Await
비동기 코드를 작성하는 새로운 방법이다. Javascript 개발자들이 훌륭한 비동기 처리 방안이 Promise로 만족하지 못하고 더 훌륭한 방법을 고안 해낸 것이다(사실 async/await는 promise기반). 절차적 언어에서 작성하는 코드와 같이 사용법도 간단하고 이해하기도 쉽다. function 키워드 앞에 async를 붙여주면 되고 function 내부의 promise를 반환하는 비동기 처리 함수 앞에 await를 붙여주기만 하면 된다. async/await의 가장 큰 장점은 Promise보다 비동기 코드의 겉모습을 더 깔끔하게 한다는 것이다. 이 것은 es8의 공식 스펙이며 node8LTS에서 지원된다(바벨이 async/await를 지원해서 곧바로 쓸수 있다고 한다!). 

* `promise`로 구현

```js
function makeRequest() {
    return getData()
        .then(data => {
            if(data && data.needMoreRequest) {
                return makeMoreRequest(data)
                  .then(moreData => {
                      console.log(moreData);
                      return moreData;
                  }).catch((error) => {
                      console.log('Error while makeMoreRequest', error);
                  });
            } else {
                console.log(data);
                return data;
            }
        }).catch((error) => {
          console.log('Error while getData', error);
        });
}
```

* `async/await` 구현

```js
async function makeRequest() { 
    try {
      const data = await getData();
      if(data && data.needMoreRequest) {
          const moreData = await makeMoreRequest(data);
          console.log(moreData);
          return moreData;
      } else {
          console.log(data);
          return data;
      }
    } catch (error) {
        console.log('Error while getData', error);
    }
}
```


#### Reference
* https://medium.com/@kiwanjung/%EB%B2%88%EC%97%AD-async-await-%EB%A5%BC-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0-%EC%A0%84%EC%97%90-promise%EB%A5%BC-%EC%9D%B4%ED%95%B4%ED%95%98%EA%B8%B0-955dbac2c4a4
* https://medium.com/@constell99/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8%EC%9D%98-async-await-%EA%B0%80-promises%EB%A5%BC-%EC%82%AC%EB%9D%BC%EC%A7%80%EA%B2%8C-%EB%A7%8C%EB%93%A4-%EC%88%98-%EC%9E%88%EB%8A%94-6%EA%B0%80%EC%A7%80-%EC%9D%B4%EC%9C%A0-c5fe0add656c
</br>

</br>

[뒤로](https://github.com/JaeYeopHan/for_beginner)/[위로](#part-2-2-javascript)

</br>

## Arrow Function
화살표 함수 표현식은 기존의 function 표현방식보다 간결하게 함수를 표현할 수 있다. 화살표 함수는 항상 익명이며, 자신의 this, arguments, super 그리고 new.target을 바인딩하지 않는다. 그래서 생성자로는 사용할 수 없다.
- 화살표 함수 도입 영향: 짧은 함수, 상위 스코프 this

### 짧은 함수
```js
var materials = [
  'Hydrogen',
  'Helium',
  'Lithium',
  'Beryllium'
];

materials.map(function(material) { 
  return material.length; 
}); // [8, 6, 7, 9]

materials.map((material) => {
  return material.length;
}); // [8, 6, 7, 9]

materials.map(({length}) => length); // [8, 6, 7, 9]
```
기존의 function을 생략 후 => 로 대체 표현

### 상위 스코프 this
```js
function Person(){
  this.age = 0;

  setInterval(() => {
    this.age++; // |this|는 person 객체를 참조
  }, 1000);
}

var p = new Person();
```
일반 함수에서 this는 자기 자신을 this로 정의한다. 하지만 화살표 함수 this는 Person의 this와 동일한 값을 갖는다. setInterval로 전달된 this는 Person의 this를 가리키며, Person 객체의 age에 접근한다.

#### Reference

* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions

</br>

[뒤로](https://github.com/JaeYeopHan/for_beginner)/[위로](#part-2-2-javascript)

</br>

=====
_JavaScript.end_
