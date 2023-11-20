초기 설정

nest 프로젝트를만들고

npm install --save @nestjs/graphql apollo-server-express graphql
npm install --save @nestjs/apollo

를 설치하여 graphql을 사용할 준비를 마쳤습니다.

＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃

폴더구조

src/
├── api/
│ ├── survey/
│ │ ├── dto/
│ │ │ └── create-survey.dto.ts
│ │ ├── entities/
│ │ │ └── survey.entity.ts
│ │ ├── survey.module.ts
│ │ ├── survey.resolver.ts
│ │ └── survey.service.ts
├── commons/
│ └── graphql/
│ └── schema.gql
├── app.module.ts
├── main.ts

이런식으로 잡아서 시작하였습니다.

＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃

간략하게 구성해본 테이블

질문 테이블--
컬럼 > pk - 질문 - 내용

선택지 테이블--
컬럼 > pk - 질문테이블pk(1:N) - 선택지의 내용 - 점수 - 순서

설문 테이블--
컬럼 > pk - 설문이름 - 설문설명 - 질문pk 배열로(배열 순서가 설문 순서라고 생각함)

답변 테이블--
컬럼 > pk -- 설문테이블pk - user테이블pk(유저테이블 있다고 가정) - 선택지pk 배열로 - 스코어합

으로 설계했습니다.

각 테이블의 간단한CRUD와

질문 테이블에는 질문만
선택지 테이블에는 질문에대한 선택지만 등록
설문 테이블에는 설문들만 등록되잇어서
궁극적으로 프론트단에 설문을 전체조회하여 뿌려주고
클라이언트가 하나의 설문을 들어가면

survey의 getQuestionsBySurveyId메소드를 활용해 데이터가
{
"data": {
"getQuestionsBySurveyId": [
{
"content": "어디를 가고 싶으신가요 ",
"choices": [
"서울",
"뉴욕",
"파리",
"상하이",
"사과"
]
},
{
"content": "무엇을 먹고 싶으신가요 ",
"choices": [
"사과",
"케일",
"키위",
"포도"
]
}
]
}
}

이런식으로 나오도록 하여 한번에 해당 설문의 질문과 답변을 가져올수 잇도록 API를 설계 했습니다.

답변테이블은 저 데이터가 뿌려진 프론트단에서 프론트개발자가 해당 질문에 대한 답변들의 배열들과 점수의 합 userId를 주면
컬럼이 존재하는것만으로 그유저가 설문하나를 완료한것으로 간주하면 될 것 같다고 생각했습니다.

＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃

에러 및 로그처리는

commons - filters - custom-exception.filter.ts파일로 구현했습니다.
예외필터를 전역으로 등록하여 graphql에서 throw가 나거나 404에러가나거나 할때 모두 공통으로 처리하게 간단히 구현하였습니다

＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃

서버실행

서버는 로컬에서 실행하였고
npm start로 실행하였습니다.
http://localhost:4000/graphql에 들어가서 api가 잘되는지 확인하였습니다.(4000포트/깃에서 받아서 vscode에서 실행하면 될 것 같습니다.)
