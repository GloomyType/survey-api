Nest GraphQL 설문조사 API
이 프로젝트는 Nest.js 프로젝트를 생성하고 GraphQL을 사용하여 설문조사 API를 구축하는 과정을 안내합니다.

시작하기
Nest 프로젝트를 생성하고 필요한 종속성을 설치합니다.

bash
Copy code
npm install --save @nestjs/graphql apollo-server-express graphql
npm install --save @nestjs/apollo
폴더 구조
plaintext
Copy code
src/
├── api/
│   └── survey/
│       ├── dto/
│       │   └── create-survey.dto.ts
│       ├── entities/
│       │   └── survey.entity.ts
│       ├── survey.module.ts
│       ├── survey.resolver.ts
│       └── survey.service.ts
├── commons/
│   └── graphql/
│       └── schema.gql
├── app.module.ts
└── main.ts
데이터베이스 디자인
질문 테이블

컬럼: PK, 질문, 내용
선택지 테이블

컬럼: PK, 질문 테이블 PK (1:N 관계), 선택지 내용, 점수, 순서
설문 테이블

컬럼: PK, 설문 이름, 설문 설명, 질문 PK 배열 (배열 순서가 설문 순서)
답변 테이블

컬럼: PK, 설문 테이블 PK, 사용자 테이블 PK (가정), 선택지 PK 배열, 총점
API 설계
CRUD 작업
각 테이블에 대한 기본적인 CRUD 작업을 구현합니다.
설문 질문 가져오기
SurveyResolver에서 getQuestionsBySurveyId 메서드를 사용하여 특정 설문에 대한 질문 및 선택지를 검색합니다.
응답 예시:

json
Copy code
{
  "data": {
    "getQuestionsBySurveyId": [
      {
        "content": "어디를 가고 싶으신가요 ",
        "choices": ["서울", "뉴욕", "파리", "상하이", "사과"]
      },
      {
        "content": "무엇을 먹고 싶으신가요 ",
        "choices": ["사과", "케일", "키위", "포도"]
      }
    ]
  }
}

에러 처리
에러 및 로그 처리는 commons/filters/custom-exception.filter.ts 파일에 중앙 집중식으로 구현되어 있습니다. GraphQL에서 throw되거나 404 오류가 발생할 때 모두 일관되게 처리됩니다.

서버 실행
bash
Copy code
npm start
http://localhost:4000/graphql을 방문하여 API와 상호 작용합니다.

Nest GraphQL 설문조사 API를 즐겨보세요!
