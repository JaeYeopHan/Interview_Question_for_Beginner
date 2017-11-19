# HOW TO CONTRIBUTE
여러 가지 방법으로 해당 Repository에 참여하실 수 있습니다 :)
PR을 올려주실 때, labels를 참고하셔서 알맞은 제목을 함께 올려주세요!
Commit Message는 `Update`라고만 해주셔도 되고, 원하시는 메세지를 적어주시면 됩니다.

## Process
해당 Repository에 contribute하는 방법을 소개드립니다.

### Pull Request를 통한 Contribute
#### 1. Fork this respository
이 repository를 fork해주세요!

#### 2. Clone forked repository
fork해간 repository를 local directory에 clone해주세요!
```bash
# in your workspace
$ git clone https://github.com/JaeYeopHan/Interview_Question_for_Beginner interview
$ cd interview
```

#### 3. Commit your
```bash
$ git add .
$ git commit -m "[your description]"
$ git push origin master
```

### 4. Register pull request for your commit
`Pull Request`를 등록해주세요.

### Optional. Resolve Conflict
Pull Request를 등록했는데, conflict가 있어서 auto merge가 안된다고 하는 경우 해당 conflict를 해결해주세요.
```bash
# in Interview_Question_for_Beginner
$ git remote add --track master upstream https://github.com/JaeYeopHan/Interview_Question_for_Beginner
$ git fetch upstream
$ git rebase upstream/master
# (resolve conflict in your editor)
$ git add .
$ git rebase --continue
$ git push -f origin master
```
* 참고자료 : [많은 Git 커맨드 중 정말 필요한 것만 정리한 내용](https://github.com/JaeYeopHan/Minimal_Git_command)

### Issue를 통한 Contribute
Pull Request 방식이 익숙하시지 않은 분들은 issue로 내용을 등록하실 수도 있습니다. 추가하고 싶은 내용을 issue로 등록해주시면 저 또는 다른 분들이 적절한 위치에 올려주신 내용을 추가할 수 있습니다 :)

</br>

---

</br>

## Labels for PR
* Edit typos or links
  * 오타 또는 잘못된 링크를 수정.
* Inaccurate information
  * 잘못된 정보에 대한 Fix.
* New Resources
  * 새로운 자료 추가

### 그 외 Labels
* Suggestions
  * 해당 `Repository`에 건의하고 싶은 사항에 대해서 `Issue`로 등록해주세요.
* Questions
  * 질문이 있으시면 해당 Label과 함께 `Issue`를 등록해주세요.

</br>

_Pull Request example>_
## Edit typo or link path
DataStructure Link 수정

</br>

---

### ISSUE_TEMPLATE
```
### This issue is...
* [ ] Edit typos or links
* [ ] Inaccurate information
* [ ] New Resources
* [ ] Suggestions
* [ ] Questions

#### Description
(say something...)

```

</br>

### PULL_REQUEST_TEMPLATE
```
### This Pull Request is...
* [ ] Edit typos or links
* [ ] Inaccurate information
* [ ] New Resources

#### Description
(say something...)

```
