# Part 2-4 SQL

* [JOIN](#join)
* [Sub Query](#sub-query)

[뒤로](https://github.com/JaeYeopHan/for_beginner)

</br>

## JOIN
- 조인 연산자에 따른 구분 : 동등 조인, 안티 조인
- 조인 대상에 따른 구분 : 셀프 조인
- 조인 조건에 따른 구분 : 내부 조인, 외부 조인, 세미 조인, 카타시안 조인
- 기타 : ANSI 조인

## 내부 조인과 외부조인
### 동등 조인(EQUI-JOIN)
- 가장 기본이자 일반적인 조인 방법
- WHERE 절에서 등호('=') 연산자를 사용해 2개 이상의 테이블이나 뷰를 연결하는 조인
- 등호 연산자를 사용하여 WHERE 절 조건에 만족하는 데이터를 추출하는 조인
    ```sql
    -- 동등 조인
    SELECT A.EMPLOYEE_ID,
           A.EMP_NAME,
           A.DEPARTMENT_ID,
           B.DEPARTMENT_NAME
    FROM EMPLOYEES A,
         DEPARTMENTS B
    WHERE A.DEPARTMENT_ID = B.DEPARTMENT_ID;
    ```

### 세미 조인(SEMI-JOIN)
- 서브 쿼리로 서브 쿼리에 존재하는 데이터만 메인 쿼리에서 추출하는 조인
- 서브 쿼리에 존재하는 메인 쿼리 데이터가 여러 건 존재해도 최종 반환되는 메인 쿼리 데이터에는 중복되는 건이 없다.
  - 일반 조인은 중복되는 건이 발생한다.
    ```sql
    SELECT A.DEPARTMENT_ID,
           A.DEPARTMENT_NAME
    FROM DEPARTMENTS A,
         EMPLOYEES B
    WHERE A.DEPARTMENT_ID = B.DEPARTMENT_ID
      AND B.SALARY > 3000
    ORDER BY A.DEPARTMENT_NAME;
    ```

#### EXISTS 사용
- 조건에 만족하는 데이터가 한 건이라도 존재하면 결과를 즉시 반환한다.
    ```sql
    -- 세미 조인, EXISTS
    SELECT DEPARTMENT_ID,
           DEPARTMENT_NAME
    FROM DEPARTMENTS A
    WHERE EXISTS(
            SELECT *
            FROM EMPLOYEES B
            WHERE A.DEPARTMENT_ID = B.DEPARTMENT_ID
              AND B.SALARY > 3000
            )
    ORDER BY A.DEPARTMENT_NAME;
    ```

#### IN 사용
- OR 조건으로 변환할 수 있는데 "이것이거나 저것이거나"로 풀어 쓸 수 있다.
    ```sql
    -- 세미 조인, IN
    SELECT DEPARTMENT_ID,
           DEPARTMENT_NAME
    FROM DEPARTMENTS A
    WHERE A.DEPARTMENT_ID IN (
                            SELECT B.DEPARTMENT_ID
                            FROM EMPLOYEES B
                            WHERE B.SALARY > 3000
                            )
    ORDER BY DEPARTMENT_NAME;
    ```

### 안티 조인(ANTI-JOIN)
- 서브 쿼리의 B 테이블에 없는 메인 쿼리 A 테이블의 데이터만 추출하는 조인
- 한쪽 테이블에만 있는 데이터를 추출하는 것
  - 조회 조건에 NOT IN, NOT EXISTS 연산자를 사용
  - 세미 조인과 반대 개념

#### NOT IN 사용
```sql
--- 안티 조인, NOT IN
SELECT A.EMPLOYEE_ID,
       A.EMP_NAME,
       A.DEPARTMENT_ID,
       B.DEPARTMENT_NAME
FROM EMPLOYEES A,
     DEPARTMENTS B
WHERE A.DEPARTMENT_ID = B.DEPARTMENT_ID
AND A.DEPARTMENT_ID NOT IN (
                        SELECT DEPARTMENT_ID
                        FROM DEPARTMENTS
                        WHERE MANAGER_ID IS NULL
                    );
```

#### NOT EXISTS 사용
```sql
SELECT COUNT(*)
FROM EMPLOYEES A
WHERE NOT EXISTS(
            SELECT 1
            FROM DEPARTMENTS C
            WHERE A.DEPARTMENT_ID = C.DEPARTMENT_ID
              AND MANAGER_ID IS NULL
            );
```

### 셀프 조인(SELF-JOIN)
- 서로 다른 두 테이블이 아닌 동일한 한 테이블을 사용해 조인하는 방법
    ```sql
    -- 셀프 조인
    SELECT A.EMPLOYEE_ID,
           A.EMP_NAME,
           B.EMPLOYEE_ID,
           B.EMP_NAME,
           A.DEPARTMENT_ID
    FROM EMPLOYEES A,
         EMPLOYEES B
    WHERE A.EMPLOYEE_ID < B.EMPLOYEE_ID
      AND A.DEPARTMENT_ID = B.DEPARTMENT_ID
      AND A.DEPARTMENT_ID = 20;
    ```

> 여기까지 내부 조인이다.

### 외부 조인(OUTER-JOIN)
- 일반 조인을 확장한 개념
- 조인 조건에 만족하는 데이터 뿐만 아니라 어느 한 쪽 테이블에 조인 조건에 명시된 컬럼에 값이 없거나(NULL 이더라도) 해당 Row가 아예 없더라도 데이터를 모두 추출한다.

#### 차이점
- 일반 조인
    ```sql
    -- 일반 조인
    SELECT A.DEPARTMENT_ID,
           A.DEPARTMENT_NAME,
           B.JOB_ID,
           B.DEPARTMENT_ID
    FROM DEPARTMENTS A,
         JOB_HISTORY B
    WHERE A.DEPARTMENT_ID = B.DEPARTMENT_ID;
    ```

- 외부 조인
  - 조인 조건에서 데이터가 없는 테이블의 컬럼에 (+)를 붙이면 된다.
    ```sql
    -- 외부 조인
    SELECT A.DEPARTMENT_ID,
           A.DEPARTMENT_NAME,
           B.JOB_ID,
           B.DEPARTMENT_ID
    FROM DEPARTMENTS A,
         JOB_HISTORY B
    WHERE A.DEPARTMENT_ID = B.DEPARTMENT_ID(+);
    ```
  - 외부 조인은 조건에 해당하는 조인 조건 모두에 (+)를 붙여야 한다.  
    ```sql
    -- 붙이기 전
    SELECT A.EMPLOYEE_ID,
           A.EMP_NAME,
           B.JOB_ID,
           B.DEPARTMENT_ID
    FROM EMPLOYEES A,
         JOB_HISTORY B
    WHERE A.EMPLOYEE_ID = B.EMPLOYEE_ID(+)
      AND A.DEPARTMENT_ID = B.DEPARTMENT_ID;
    ```
    ```sql
    -- 붙인 후
    SELECT A.EMPLOYEE_ID,
           A.EMP_NAME,
           B.JOB_ID,
           B.DEPARTMENT_ID
    FROM EMPLOYEES A,
         JOB_HISTORY B
    WHERE A.EMPLOYEE_ID = B.EMPLOYEE_ID(+)
      AND A.DEPARTMENT_ID = B.DEPARTMENT_ID(+);
    ```

#### 외부 조인 정리
- 조인 대상 테이블 중 데이터가 없는 테이블 조인 조건에 (+)를 붙인다.
- 외부 조인의 조인 조건이 여러 개일 때 모든 조건에 (+)를 붙인다.
- 한 번에 한 테이블에만 외부 조인을 할 수 있다.
  - 조인 대상 테이블이 A, B, C 3개일 경우
    - A를 기준으로 B 테이블을 외부 조인으로 연결
    - 동시에 C를 기준으로 B 테이블에 외부 조인을 걸 수 없음
- (+) 연산자가 붙은 조건과 OR을 같이 사용할 수 없다.
- (+) 연산자가 붙은 조건에는 IN 연산자를 같이 사용할 수 없다.
  - 단, IN절 포함되는 값이 1개일 떄는 가능

### 카타시안 조인(CATASIAN PRODUCT)
- WHERE 절에 조인 조건이 없는 조인
  - FROM 절에 테이블을 명시했으나 두 테이블 간 조인 조건이 없다.
- 조인 조건이 없으므로 쿼리의 결과는 두 테이블 건수의 곱이다.
  - A 테이블 건수가 n1, B 테이블일 건수가 n2라면 결과는 "n1 * n2" 이다.
    ```sql
    -- EMPLOYEES 107건
    -- DEPARTMENTS 27건
    -- 107 * 27 = 2,889건
    SELECT A.EMPLOYEE_ID,
           A.EMP_NAME,
           B.DEPARTMENT_ID,
           B.DEPARTMENT_NAME
    FROM EMPLOYEES A,
         DEPARTMENTS B;
    ```

## ANSI 조인
- ANSI SQL 문법을 사용한 조인
  - 모든 조인은 ANSI SQL을 사용해 변환이 가능하다.
- 기존 문법과는 달리 WHERE 절이 아닌 FROM 절에 조인 조건이 위치한다.

### ANSI 내부 조인
- 기존 문법
    ```sql
    -- 작성 방법
    SELECT A.컬럼1,
           A.컬럼2,
           B.컬럼1,
           B.컬럼2 ...
    FROM 테이블 A,
         테이블 B
    WHERE A.컬럼1 = B.컬럼1 → 조인조건
    ... ;
    ```
    ```sql
    -- 작성 예시
    SELECT A.EMPLOYEE_ID,
           A.EMP_NAME,
           B.DEPARTMENT_ID,
           B.DEPARTMENT_NAME
    FROM EMPLOYEES A,
         DEPARTMENTS B
    WHERE A.DEPARTMENT_ID = B.DEPARTMENT_ID
      AND A.HIRE_DATE >= TO_DATE('2003-01-01', 'YYYY-MM-DD');
    ```

- ANSI 문법
    ```sql
    -- 작성 방법
    SELECT A.컬럼1,
           A.컬럼2,
           B.컬럼1,
           B.컬럼2 ...
    FROM 테이블 A
        INNER JOIN 테이블 B
                ON ( A.컬럼1 = B.컬럼1 ) → 조인조건
    WHERE ... ;
    ```
    ```sql
    -- 작성 예시
    SELECT A.EMPLOYEE_ID,
           A.EMP_NAME,
           B.DEPARTMENT_ID,
           B.DEPARTMENT_NAME
    FROM EMPLOYEES A
        INNER JOIN DEPARTMENTS B
                ON (A.DEPARTMENT_ID = B.DEPARTMENT_ID)
    WHERE A.HIRE_DATE >= TO_DATE('2003-01-01', 'YYYY-MM-DD');
    ```

- ANSI 내부 조인은 FROM 절에서 INNER JOIN 구문을 쓴다.
  - 조인 조건은 ON 절에, 그 외의 조건은 기존대로 WHERE 절에 명시한다.
- 조인 조건 컬럼이 두 테이블 모두 동일하다면 ON 대신 USING 사용이 가능하다.
  - 이때는 SELECT 절에서 조인 조건에 포함된 컬럼명을 **테이블명.컬럼명** 형태가 아닌 **컬럼명**만 기술해야한다.
    ```sql
    -- 잘 작성 되지 못한 경우
    SELECT A.EMPLOYEE_ID,
        A.EMP_NAME,
        B.DEPARTMENT_ID,
        B.DEPARTMENT_NAME
    FROM EMPLOYEES A
        INNER JOIN DEPARTMENTS B
             USING (DEPARTMENT_ID)
    WHERE A.HIRE_DATE >= TO_DATE('2003-01-01', 'YYYY-MM-DD');
    ```
    ```sql
    -- 잘 작성 된 경우
    SELECT A.EMPLOYEE_ID,
        A.EMP_NAME,
        DEPARTMENT_ID,
        B.DEPARTMENT_NAME
    FROM EMPLOYEES A
        INNER JOIN DEPARTMENTS B
             USING (DEPARTMENT_ID)
    WHERE A.HIRE_DATE >= TO_DATE('2003-01-01', 'YYYY-MM-DD');
    ```
    - 두 테이블 간 조인 조건에 사용되는 컬럼 명이 동일한 경우가 많다.
      - 다를 때도 있으므로 USING 대신 ON 절을 사용하도록 하자.

### ANSI 외부 조인
- ANSI 외부 조인도 내부 조인과 비슷하다.
- 기존 문법
    ```sql
    -- 작성 방법
    SELECT A.컬럼1,
           A.컬럼2,
           B.컬럼1,
           B.컬럼2 ...
    FROM 테이블 A,
         테이블 B
    WHERE A.컬럼1 = B.컬럼1(+)
    ... ;
    ```
    ```sql
    -- 작성 예시
    SELECT A.EMPLOYEE_ID,
           A.EMP_NAME,
           B.JOB_ID,
           B.DEPARTMENT_ID
    FROM EMPLOYEES A,
         JOB_HISTORY B
    WHERE A.EMPLOYEE_ID = B.EMPLOYEE_ID
      AND A.DEPARTMENT_ID = B.DEPARTMENT_ID(+);
    ```
- ANSI 문법
    ```sql
    -- 작성 방법
    SELECT A.컬럼1,
           A.컬럼2,
           B.컬럼1,
           B.컬럼2 ...
    FROM 테이블 A
         LEFT(RIGHT) [OUTER] JOIN 테이블 B
                               ON ( A.컬럼1 = B.컬럼1 )
    WHERE ... ;
    ```
    ```sql
    -- 작성 예시(LEFT OUTER)
    SELECT A.EMPLOYEE_ID,
           A.EMP_NAME,
           B.JOB_ID,
           B.DEPARTMENT_ID
    FROM EMPLOYEES A
        LEFT OUTER JOIN JOB_HISTORY B
                     ON (
                         A.EMPLOYEE_ID = B.EMPLOYEE_ID
                         AND A.DEPARTMENT_ID = B.DEPARTMENT_ID
                        );
    ```
    ```sql
    -- 작성 예시(RIGHT OUTER)
    SELECT A.EMPLOYEE_ID,
           A.EMP_NAME,
           B.JOB_ID,
           B.DEPARTMENT_ID
    FROM JOB_HISTORY B
        RIGHT OUTER JOIN EMPLOYEES A
                      ON (
                          A.EMPLOYEE_ID = B.EMPLOYEE_ID
                          AND A.DEPARTMENT_ID = B.DEPARTMENT_ID
                         );
    ```
    - ANSI 외부 조인은 FROM 절에 명시된 테이블 순서에 입각한다.
      - 먼저 명시된 테이블 기준으로 LEFT 또는 RIGHT를 붙인다.
    - 외부 조인은 OUTER라는 키워드를 붙이는데, 생략이 가능하다.
        ```sql
        -- 작성 예시(LEFT OUTER)
        SELECT A.EMPLOYEE_ID,
            A.EMP_NAME,
            B.JOB_ID,
            B.DEPARTMENT_ID
        FROM EMPLOYEES A
            LEFT JOIN JOB_HISTORY B
                   ON (
                       A.EMPLOYEE_ID = B.EMPLOYEE_ID
                       AND A.DEPARTMENT_ID = B.DEPARTMENT_ID
                      );
        ```

### CROSS 조인
- 카타시안 조인을 ANSI 조인에서는 CROSS 조인이라고 한다.
- 기존 문법
    ```sql
    -- 카타시안 조인
    SELECT A.EMPLOYEE_ID,
           A.EMP_NAME,
           B.DEPARTMENT_ID,
           B.DEPARTMENT_NAME
    FROM EMPLOYEES A,
         DEPARTMENTS B;
    ```
- ANSI 문법
    ```sql
    -- 크로스 조인
    SELECT A.EMPLOYEE_ID,
           A.EMP_NAME,
           B.DEPARTMENT_ID,
           B.DEPARTMENT_NAME
    FROM EMPLOYEES A
        CROSS JOIN DEPARTMENTS B;
    ```

### FULL OUTER 조인
- 외부 조인의 하나로 ANSI 조인에서만 제공한다.
  - 기존 문법으로 사용할 수 없다.
- 외부 조인으로 해결 할 수 없는 조회
    ```sql
    -- 테스트 테이블 작성
    CREATE TABLE TEST_A ( EMP_ID INT);

    INSERT INTO TEST_A VALUES ( 10);
    INSERT INTO TEST_A VALUES ( 20);
    INSERT INTO TEST_A VALUES ( 30);

    CREATE TABLE TEST_B ( EMP_ID INT);

    INSERT INTO TEST_B VALUES ( 10);
    INSERT INTO TEST_B VALUES ( 20);
    INSERT INTO TEST_B VALUES ( 40);
    ```
  - 위 테이블을 아래와 같이 조회하고 싶을 때
    |EMP_ID_A|EMP_ID_B|
    |:----:|:----:|
    |10|10|
    |20|20|
    |30||
    ||40|
  - 일반적인 외부 조인으로는 한 문장으로 처리가 불가능하다.
    - 집합 연산자를 사용하면 가능하다.
    ```sql
    -- 일반적인 외부 조인, 오류 발생
    SELECT A.EMP_ID,
           B.EMP_ID
    FROM TEST_A A,
         TEST_B B
    WHERE A.EMP_ID(+) = B.EMP_ID(+);
    ```
    ```
    SQL 오류 : ORA-01468: outer-join된 테이블은 1개만 지정할 수 있습니다.
    ```
  - 외부 조인 조건에서는 한 쪽에만 (+)를 붙일 수 있다.
    - 해결하기 위해선 FULL OUTER 조인을 사용해야 한다.
    - 이를 사용하면 두 테이블 모두를 외부 조인 대상에 넣을 수 있다.
    ```sql
    -- 오류 발생 없이 원하는 결과 출력
    SELECT A.EMP_ID,
           B.EMP_ID
    FROM TEST_A A
        FULL OUTER JOIN TEST_B B
                     ON ( A.EMP_ID = B.EMP_ID );
    ```

> 모든 조인은 기존 오라클 문법과 ANSI 문법을 사용해 모두 구현할 수 있다.
> > FULL OUTER JOIN은 ANSI 문법을 사용해야 한다.

[뒤로](https://github.com/JaeYeopHan/for_beginner)/[위로](#part-2-4-sql)

</br>

## Sub Query
- SQL 문장 안에서 보조로 사용되는 또 다른 SELECT문을 의미
- SELECT, FROM, WHERE 절 모두에서 사용할 수 있다.
  - INSERT, UPDATE, MERGE, DELETE 문에서도 사용할 수 있다.
- 서브 쿼리의 구분 방법
  - 메인 쿼리의 연관성에 따라 구분
    - 연관성 없는(Noncorrelated) 서브 쿼리
    - 연관성 있는 서브 쿼리
  - 형태에 따라
    - 일반 서브 쿼리(SELECT 절)
    - 인라인 뷰(FROM 절)
    - 중첩 쿼리(WHERE 절)

### 연관성 없는 서브 쿼리
- 메인 쿼리와의 연관성이 없는 서브 쿼리.
  - 메인 테이블과 조인 조건이 걸리지 않는 서브 쿼리
- 예제
  ```sql
  -- 유형 1
  -- 전 사원의 평균 급여 이상을 받는 사원수를 조회
  SELECT count(*)
  FROM EMPLOYEES
  WHERE SALARY >= (
      SELECT AVG(SALARY)
      FROM EMPLOYEES );
  ```
  - 서브 쿼리에서 평균 급여를 구한 뒤 메인 쿼리에서 평균값보다 큰 사원을 조회
  ```sql
  -- 유형 2
  -- 부서 테이블에서 PARENT_ID 가 NULL 인 부서번호를 가진 사원의 총 건수를 반환
  SELECT COUNT(*)
  FROM EMPLOYEES
  WHERE DEPARTMENT_ID IN (SELECT DEPARTMENT_ID
                          FROM DEPARTMENTS
                          WHERE PARENT_ID IS NULL);
  ```
  - 유형 1은 서브 쿼리에서 단일 행을 반환하지만 유형 2는 여러 행을 반환했다.
  ```sql
  -- 유형 3
  -- EMPLOYEE_ID, JOB_ID 두 값과 같은 건을 사원 테이블에서 조회
  SELECT EMPLOYEE_ID,
         EMP_NAME,
         JOB_ID
  FROM EMPLOYEES
  WHERE (EMPLOYEE_ID, JOB_ID) IN (SELECT EMPLOYEE_ID, JOB_ID
                                  FROM JOB_HISTORY);
  ```
  - 동시에 2개 이상의 컬럼 값이 같은 건을 조회한다.
  - IN 앞에 있는 컬럼 개수와 서브 쿼리에서 반환하는 컬럼 개수, 유형은 같아야 한다.
  ```sql
  -- 전 사원의 급여를 평균 금액으로 갱신
  UPDATE EMPLOYEES
  SET SALARY = (SELECT AVG(SALARY) FROM EMPLOYEES);
  ```
  ```sql
  -- 평균 급여보다 많이 받는 사원 삭제
  DELETE EMPLOYEES
  WHERE SALARY > (SELECT AVG(SALARY) FROM EMPLOYEES);
  ```

### 연관성 있는 서브 쿼리
- 메인 테이블과 조인 조건이 걸린 서브 쿼리
  ```sql
  -- 서브 쿼리 안에서 메인 쿼리에서 사용된 부서 테이블의 부서번호와
  -- JOB_HISTORY 테이블의 부서번호가 같은 건을 조회
  SELECT A.DEPARTMENT_ID,
         A.DEPARTMENT_NAME
  FROM DEPARTMENTS A
  WHERE EXISTS(SELECT 1
               FROM JOB_HISTORY B
               WHERE A.DEPARTMENT_ID = B.DEPARTMENT_ID);
  ```
  ```sql
  -- JOB_HISTORY 테이블 조회
  SELECT A.EMPLOYEE_ID,
       (SELECT B.EMP_NAME
        FROM EMPLOYEES B
        WHERE A.EMPLOYEE_ID = B.EMPLOYEE_ID)     AS EMP_NAME,
       A.DEPARTMENT_ID,
       (SELECT B.DEPARTMENT_NAME
        FROM DEPARTMENTS B
        WHERE A.DEPARTMENT_ID = B.DEPARTMENT_ID) AS DEP_NAME
  FROM JOB_HISTORY A;
  ```
  - SELECt 절 자체에도 여러 개의 서브 쿼리를 넣을 수 있다.
    - 각 서브 쿼리가 독립적이므로 중복된 별칭을 사용해도 무방하다.
  ```sql
  -- 1. 평균 급여를 구하고 이 값보다 큰 급여의 사원을 걸러내기
  -- 2. 평균 급여 이상을 받는 사원이 속한 부서를 추출하기
  SELECT A.DEPARTMENT_ID, A.DEPARTMENT_NAME
  FROM DEPARTMENTS A
  WHERE EXISTS(SELECT 1
               FROM EMPLOYEES B
               WHERE A.DEPARTMENT_ID = B.DEPARTMENT_ID
                 AND B.SALARY > (SELECT AVG(SALARY)
                                 FROM EMPLOYEES)
              );
  ```
  - 위와 같이 서브쿼리는 여러 단계예 걸쳐 사용이 가능하다.
  ```sql
  -- 상위 부서가 기획부(부서번호 90)에 속하는 사원들의 부서별 평균 급여 조회
  SELECT DEPARTMENT_ID, AVG(SALARY)
  FROM EMPLOYEES
  WHERE DEPARTMENT_ID IN (SELECT DEPARTMENT_ID
                          FROM DEPARTMENTS
                          WHERE PARENT_ID = 90)
  GROUP BY DEPARTMENT_ID;
  ```
  ```sql
  -- 위 쿼리의 결과를 이용해
  -- 상위 부서가 기획부에 속하는 모든 사원의 급여를 자신의 부서별 평균 급여로 갱신
  -- UPDATE문 사용
  UPDATE EMPLOYEES A
  SET A.SALARY = (SELECT SAL
                  FROM (SELECT B.DEPARTMENT_ID, AVG(C.SALARY) AS SAL
                        FROM DEPARTMENTS B,
                            EMPLOYEES C
                        WHERE B.PARENT_ID = 90
                          AND B.DEPARTMENT_ID = C.DEPARTMENT_ID
                        GROUP BY B.DEPARTMENT_ID) D
                  WHERE A.DEPARTMENT_ID = D.DEPARTMENT_ID)
  WHERE A.DEPARTMENT_ID IN (SELECT DEPARTMENT_ID
                            FROM DEPARTMENTS
                            WHERE PARENT_ID = 90);
  ```
  - UPDATE문에서 연관성 있는 서브 쿼리를 사용하면 복잡해지는 단점이 있다.
    - MERGE문으로 변경하면 훨씬 적은 코드로 작성이 가능하다.
  ```sql
  -- MERGE문 사용
  MERGE INTO EMPLOYEES A
  USING (SELECT B.DEPARTMENT_ID, AVG(C.SALARY) AS SAL
        FROM DEPARTMENTS B,
             EMPLOYEES C
        WHERE B.PARENT_ID = 90
          AND B.DEPARTMENT_ID = C.DEPARTMENT_ID
        GROUP BY B.DEPARTMENT_ID) D
  ON (A.DEPARTMENT_ID = D.DEPARTMENT_ID)
  WHEN MATCHED THEN
    UPDATE
    SET A.SALARY = D.SAL;
  ```
  ```sql
  -- 조회
  SELECT DEPARTMENT_ID,
         MIN(SALARY),
         MAX(SALARY)
  FROM EMPLOYEES A
  WHERE DEPARTMENT_ID IN (SELECT DEPARTMENT_ID
                          FROM DEPARTMENTS
                          WHERE PARENT_ID = 90)
  GROUP BY DEPARTMENT_ID;
  ```

> Oracle에서는 JOIN UPDATE를 지원하지 않는다.
> > 간단한 UPATE문을 제외하고는 MERGE문을 추천한다.

### 인라인 뷰
- FROM절에 사용하는 서브 쿼리
  - 서브 쿼리를 FROM절에 사용해 하나의 테이블이나 뷰처럼 사용할 수 있다.
  - 뷰를 해체하면 하나의 독립적인 SELECT문이므로 인라인 뷰라 불린다.
- 예제
  ```sql
  -- 기획부(90) 산하에 있는 부서에 속한 사원의 평균 급여보다 많은 급여를 받는 사원 목록 조회
  SELECT A.EMPLOYEE_ID, A.EMP_NAME, B.DEPARTMENT_ID, B.DEPARTMENT_NAME
  FROM EMPLOYEES A,
       DEPARTMENTS B,
      (SELECT AVG(C.SALARY) AVG_SALARY
        FROM DEPARTMENTS B,
             EMPLOYEES C
        WHERE B.PARENT_ID = 90
          AND B.DEPARTMENT_ID = C.DEPARTMENT_ID) D
  WHERE A.DEPARTMENT_ID = B.DEPARTMENT_ID
    AND A.SALARY > D.AVG_SALARY;
  ```
  ```sql
  -- 2000년 이탈리아 평균 매출액(연평균)보다 큰 월의 평균 매출액 조회
  -- 1. 월 평균 매출액 조회
  -- 2. 연 평균 매출액 조회
  -- 3. 월 평균 매출액 > 연 평균 매출액 조회
  SELECT A.*
  FROM (SELECT A.SALES_MONTH,
               ROUND(AVG(A.AMOUNT_SOLD)) MONTH_AVG
        FROM SALES A,
             CUSTOMERS B,
             COUNTRIES C
        WHERE A.SALES_MONTH BETWEEN '200001' AND '200012'
          AND A.CUST_ID = B.CUST_ID
          AND B.COUNTRY_ID = C.COUNTRY_ID
          AND C.COUNTRY_NAME = 'Italy'
        GROUP BY A.SALES_MONTH
      ) A,
      (SELECT ROUND(AVG(A.AMOUNT_SOLD)) YEAR_AVG
        FROM SALES A,
             CUSTOMERS B,
             COUNTRIES C
        WHERE A.SALES_MONTH BETWEEN '200001' AND '200012'
          AND A.CUST_ID = B.CUST_ID
          AND B.COUNTRY_ID = C.COUNTRY_ID
          AND C.COUNTRY_NAME = 'Italy'
        ) B
  WHERE A.MONTH_AVG > B.YEAR_AVG;
  ```

## 정리
- 조인 : 연결고리를 이용해 2개 이상의 테이블이나 뷰를 연결해서 데이터를 추출하는 방법
- 조인은 조인 조건을 통해 이루어지며, 조인에는 크게 내부 조인, 외부 조인으로 나눌 수 있다.
- 외부 조인은 조인에 참여하는 어느 한 테이블의 데이터가 NULL 이거나 없는 건도 추출할 수 있다.
- ANSI SQL을 이용해 조인하는 것을 ANSI 조인이라하며, FUILL OUTER 조인은 ANSI 조인에서만 가능하다.
- 한 SQL 문장에서 메인 쿼리 이외의 SELECT 절을 서브 쿼리라 하며 한 개 이상의 서브 쿼리를 사용할 수 있다.
- 서브 쿼리는 크게 연관성 없는 서브 쿼리, 메인 쿼리와 조인 조건을 이루는 연관성 있는 서브 쿼리, 그리고 FROM 절에 위치한 인라인 뷰로 나눌 수 있다.
- 복잡한 SQL을 작성해야 할 경우 '분할해서 정복'하는 개념을 이용하여 단위별로 쿼리를 작성한 뒤, 작성된 단위별 쿼리르 통합하면 쉽게 작성할 수 있다.

[뒤로](https://github.com/JaeYeopHan/for_beginner)/[위로](#part-2-4-sql)

</br>

_Sqld.end_