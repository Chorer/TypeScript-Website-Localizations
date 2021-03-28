// 일반적으로 배열은 0부터 여러 개의
// 단일 타입 객체를 포함할 수 있습니다.
// TypeScript는 다양한 타입을 포함하고,
// 색인되는 순서가 중요한 배열을 특별하게 분석할 수 있습니다.

// 이를 튜플이라고 부릅니다. 튜플을 일부 데이터에 연결하기 위한
// 방법으로 생각할 수 있지만, 키로 구성되는 객체보다 구문을 덜 가집니다.

// JavaScript의 배열 구문을 사용하여 튜플을 생성할 수 있습니다:

const failingResponse = ["Not Found", 404];

// 하지만 튜플로서 배열의 타입을 선언할 필요가 있을 것입니다.

const passingResponse: [string, number] = ["{}", 200];

// 두 변수 이름에 호버해보면
// 배열 ( (string | number)[] )과 튜플 ( [string, number] )의
// 차이점을 볼 수 있습니다.

// 하나의 배열로서, 순서는 중요하지 않아서
// 모든 인덱스에 있는 요소는 문자열 또는 숫자가 될 수 있습니다.
// 튜플에서 순서와 길이는 보장됩니다.

if (passingResponse[1] === 200) {
  const localInfo = JSON.parse(passingResponse[0]);
  console.log(localInfo);
}

// 이는 TypeScript가 올바른 인덱스에서 올바른 타입을 제공하고,
// 선언되지 않은 인덱스에 있는 객체에 접근하면
// 에러가 발생한다는 것을 의미합니다.

passingResponse[2];

// 튜플은 적은 양의 연결된 데이터
// 또는 고정된 데이터를 위한 좋은 패턴처럼 느껴질 수 있습니다.

type StaffAccount = [number, string, string, string?];

const staff: StaffAccount[] = [
  [0, "Adankwo", "adankwo.e@"],
  [1, "Kanokwan", "kanokwan.s@"],
  [2, "Aneurin", "aneurin.s@", "Supervisor"],
];

// 튜플의 시작에서 알려진 타입의 집합을
// 가지고 나서 길이를 알 수 없을 때,
// 길이에 상관없고 추가 인덱스가 특정한 타입이 된다는 것을
// 나타내기 위해 전개 연산자를 사용할 수 있습니다:

type PayStubs = [StaffAccount, ...number[]];

const payStubs: PayStubs[] = [
  [staff[0], 250],
  [staff[1], 250, 260],
  [staff[0], 300, 300, 300],
];

const monthOnePayments = payStubs[0][1] + payStubs[1][1] + payStubs[2][1];
const monthTwoPayments = payStubs[1][2] + payStubs[2][2];
const monthThreePayments = payStubs[2][2];

// 타입을 가진 매개변수 중 정의되지 않은 숫자를 사용하는
// 함수를 설명하기 위해 튜플을 사용할 수 있습니다:

declare function calculatePayForEmployee(id: number, ...args: [...number[]]): number;

calculatePayForEmployee(staff[0][0], payStubs[0][1]);
calculatePayForEmployee(staff[1][0], payStubs[1][1], payStubs[1][2]);

//
// https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-0.html#tuples-in-rest-parameters-and-spread-expressions
// https://auth0.com/blog/typescript-3-exploring-tuples-the-unknown-type/
