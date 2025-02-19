# SANTA
 등산메이트 찾기 서비스
<br /> Front-end : 이명섭 (https://seobe22.tistory.com)<br />
Front-end : 여지영 (https://github.com/Jennayeo)
- <a href="http://www.santa-mountain.com"> 산타 바로가기 </a> <br />
- <a href="https://youtu.be/jELf9Zxg8Ss"> 산타 시연영상 </a>

## 목차
[1. 프로젝트 개요](#개요)<br />
[2. 프로젝트 소개](#⛰SANTA⛰란?)<br />
[3. 사용 기술](#사용-기술)<br />
[4. 기능 소개](#기능-소개)<br />


## 개요
- 개발기간: 2021.04.28 - 2021.05.12 <br />
- 개발 인원: 프론트엔드 2, 백엔드 2, 디자이너 2 <br />
  FrontEnd(React): 2명 <br />
  BackEnd(Spring): 2명(<a href="https://github.com/bigduk88/SANTA">Github</a>) <br />
  Designer: 2명(UI/UX Wireframe) <br />


## ⛰SANTA⛰란?
<p align="center">
    <br />
<img width="200px" height="108px" src="https://user-images.githubusercontent.com/79817557/119305735-194bf980-bca4-11eb-8c08-481ae336867c.png" />
</p>

<p>SANTA는 혼자서는 가기는 애매하고, 지인들은 바빠서 등산을 망설이시는 분들을 위한 등산메이트를 구할 수 있는 서비스입니다!</p>



## 사용 기술
- View (React with JavaScript, React-Router, antd, Styled-components)
- State Management (Redux, Immer, Redux-actions)
- Build Tool (Create React App)
- Code Quality Tool (ESLint, Prettier)
- Infrastructure (AWS S3)
- Design Tool (Figma)
- Other Tools (Git, Github, notion, Slack etc.)


## 기능 소개
+ 카카오 소셜 로그인
+ 모임 모집하기(주최자)
  + 원하는 날짜, 장소, 인원, 이미지, 내용을 추가해 모집글을 작성할 수 있다.
  + 신청자를 수락, 거절할 수 있다.
  + 주최자가 희망시 마감하거나 모집 기간이 지나면 자동 마감된다.
+ 모임 참여하기(참가자)
  + 원하는 모임에 지원할 수 있다.
  + 모임이 마감되기 전까지 지원 취소 가능하다.
+ 모임 후기 남기기
  + 참가했던 모임에 대해서만 후기를 남길 수 있다.
+ 마이페이지
  + 내가 신청, 참여, 작성했던 모임을 확인할 수 있다.
  + 다른 유저가 신청, 참여, 작성했던 모임을 확인할 수 있다.
