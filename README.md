# 프로젝트 개요

- 프로젝트의 목적: Next.js의 서버 컴포넌트, 스트리밍, 데이터 패칭, 캐싱에 대해 이해하고 적절한 상황에 적용하기
- 주요 기술 스택: Next.js, NextAuth, React Query, Tailwind CSS , Swiper
- 프로젝트 핵심 기능: 무한스크롤, 검색, 그룹 및 멤버 별 필터링, 좋아요 기능

# 기능 별 설명

## 1. 전체 페이지

### 동적 페이지로 구현

1. 검색어, 그룹, 멤버 등 다양한 URL 파라미터를 사용
    - 사용자의 인터랙션에 따라 이 파라미터들이 동적으로 변경됨
    - 변경된 파라미터를 기반으로 검색 결과 목록도 실시간으로 갱신되어야 하기 때문에
2. 사용자 인증 상태에 따라 UI가 변해야 하기 때문에 

![image](https://github.com/user-attachments/assets/c50d215c-cf96-4140-a77c-efb321547056)


### 스트리밍 이용

1. 스트리밍을 사용한 이유
    - GroupFilter와 CardList는 각각 독립적인 데이터 페칭을 수행
    - 두 컴포넌트의 데이터 로딩 시간이 다를 수 있음
    - 사용자 경험을 위해 각 컴포넌트를 독립적으로 스트리밍
2. 스트리밍 구현 방식
- Suspense를 사용해서 컴포넌트 단위로 스트리밍함
- 스켈레톤 UI를 통한 로딩 상태 표시 → 검색
- key props를 이용해서 검색 파라미터 변경 시 컴포넌트 리마운트 가능하게 함

```jsx
   // GroupFilter 컴포넌트
   <Suspense fallback={<GroupSkeleton />}>
     <GroupFilter searchParams={searchParams} />
   </Suspense>

   // CardList 컴포넌트
   <Suspense
     key={JSON.stringify(searchParams)}
     fallback={<CardListSkeleton />}
   >
     <CardListServer searchParams={searchParams} />
   </Suspense>
```

## 2. 무한스크롤

### 서버/클라이언트 컴포넌트 분리

![image](https://github.com/user-attachments/assets/abb3ebf3-fd25-4605-a691-34665f98d8d8)


1. 분리한 이유
    - 초기 데이터를 서버에서 직접 페칭해 첫 페이지 로드 최적화를 위해
2. 데이터 흐름
    - 초기 데이터를 서버에서 직접 페칭
    - 클라이언트에 초기 데이터 전달
    - 서버에서 받은 초기 데이터를 기반으로 React Query 초기화
    - 스크롤 이벤트 처리
    - 추가 데이터 페칭 및 UI 업데이트

## 3. 좋아요

### next-auth를 이용한 로그인

- 앱 시작 시 Signin 컴포넌트 마운트
- useEffect를 통해 자동 로그인 시도
- Credentials Provider의 authorize 함수에서 인증 처리
- 인증 성공 시 JWT 토큰 생성
- SessionProvider를 통해 전역 세션 상태 관리
- seSession 훅으로 클라이언트 컴포넌트에서 세션 접근

### 옵티미스틱 업데이트

```jsx
onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ["wishList"] });

      const previousWishList = queryClient.getQueryData(["wishList"]);

      queryClient.setQueryData<{ data: { results: number[] } }>(
        ["wishList"],
        (old) => {
          if (!old) return old;
          const currentList = old.data.results || [];
          const isWishOn = currentList.includes(id);

          return {
            ...old,
            data: {
              ...old.data,
              results: isWishOn
                ? currentList.filter((itemId) => itemId !== id)
                : [...currentList, id],
            },
          };
```

- React Query의 `useMutation`, `queryClient.setQueryData`을 사용
- `queryClient.setQueryData`는 캐시된 데이터를 즉시 업데이트 할 수 있어서 
좋아요 토글 시 즉시 UI 업데이트
- 백그라운드에서 API 요청 처리
- 실패 시 이전 상태로 롤백

### 서버 액션을 사용하지 않은 이유

- 낙관적 업데이트가 중요한 기능의 경우 React Query와 같은 클라이언트 상태 관리 라이브러리를 사용하는 것이 더 효율적이라서
    - 서버 액션은 서버에서 직접 실행되고, 클라이언트 쪽 상태를 자동으로 업데이트해주지 않기 때문에
- 서버 액션은 폼 기반 전송에 더 적합함

## 4. 데이터 캐싱

1. 카드 목록 데이터 (15분)
    - 카드 목록은 30분 마다 변경되는 데이터
    - 15분 동안 동일한 검색어에 대한 중복 요청 방지
2. 그룹 및 멤버 데이터 (1시간)
    - 그룹과 멤버 데이터는 자주 변경되지 않음
3. 좋아요 목록 데이터 (캐싱 안함)
    - 실시간으로 변경 돼야하는 데이터

# 보완할 점

- 카드 스켈레톤 중간에서 데이터가 로드 되지 않는 것
- 그룹, 멤버 변경 시 스켈레톤이 안 뜨는 것
- SEO 관련 코드 추가
- 접근성 개선
