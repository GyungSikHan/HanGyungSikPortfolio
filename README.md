# 한경식

👋 안녕하세요, Unreal Engine 기반 게임 개발자를 준비중인 한경식입니다.

---

## 🎮 Individual Projects

### 🌸 Blossom Of Shadow (개인 프로젝트)
> Unreal Engine 기반 3D 액션 RPG (1인 개발)

🔗 GitHub: https://github.com/GyungSikHan/BlossomOfShadow  
🔗 Demo Video: https://youtu.be/sI_5kmsh7MY  
🔗 Portfolio: https://drive.google.com/file/d/1LRnWCWV3obmQORMKDY8yV8YeIxzddGuA/view  

- **엔진**: Unreal Engine 5.4  
- **기술**: C++, Blueprint  

**핵심 구현**
- Behavior Tree + EQS 기반 AI 전투 시스템
- 콤보 기반 전투 시스템 (AnimNotify 활용)
- Weapon / Skill 구조 설계 (확장성 고려)

**포인트**
- 시스템 단위 설계를 통한 확장성 확보
- AI 상태 전환 및 거리 기반 전투 전략 구현

---

## 🎮 Team Projects

### 🔥 EMBER: The Eternal Blizzard (팀 프로젝트 / 6인)
> Unreal Engine 기반 Survival Action 게임

🔗 GitHub: https://github.com/GyungSikHan/1st-Team4-Final-Project</br>
🔗 Demo Video: [https://youtu.be/q2ws313NTcg](https://youtu.be/1DuNwBaC0Xg?si=WEej5vCPnHy81gVT)<br>
🔗 Portfolio: [https://drive.google.com/file/d/1zo_iDcPDlLVG9eGryJzAW-Y4Bwr19yAZ/view](https://drive.google.com/file/d/1PpsPOJKj8707m6JqEeOPmhDDgPz4zifB/view?usp=sharing)

- **엔진**: Unreal Engine 5.5
- **기술**: C++, Blueprint, Git

**핵심 구현**
- AI 전투 시스템 설계 및 구현
  - Combat / Weapon / Damage / Sound 로직을 분리한 구조로 AI 전투 시스템 구현
- Behavior Tree 기반 AI 공격 로직 구현
  - BT Task에서 공격 몽타주 실행 후 InProgress 상태 유지 → 몽타주 종료 시 FinishLatentTask 처리하여 공격 후 AI 상태 정지 문제 해결
- 데이터 기반 Damage 시스템 구현
  - FDamageData 구조체로 데미지·이펙트·사운드를 묶어 데이터 기반 밸런싱 가능하도록 설계
- AI Weapon 충돌 판정 시스템 구현
  - 공격 시점에만 충돌체 활성화하도록 설계하여 정확한 타격 판정 처리
- ArmorComponent 기반 플레이어 장비 시스템 구현
  - 방어구 장착 데이터를 Replication으로 동기화하여 네트워크 환경에서도 동일한 장착 상태 유지 가능하도록 설계
- Main UI 에셋 프로젝트 흐름 연동
  - 메인 메뉴 → 게임 시작 흐름을 연결하고 GameMode / GameInstance 구조에 맞게 UI 진입 구조 구성

**포인트**
- AI 전투 로직을 Combat / Weapon / Damage / Sound 시스템으로 분리하여 유지보수성과 확장성 확보
- 싱글 프로젝트이지만 멀티플레이 전환을 고려한 RPC / Replication 구조 설계

----------

###  🔫 SYMBIO (팀 프로젝트 / 4인)
> Unreal Engine 기반 1인칭 FPS 전투 게임

🔗 GitHub: https://github.com/GyungSikHan/1st-Team14-CH3-Project</br>
🔗 Demo Video: https://youtu.be/tJcozATuAgQ?si=-gHiBJwwpUamFQjY </br>
🔗 Portfolio: https://drive.google.com/file/d/1wuGg5KNYLVXD0ZXs_h4th62TAfnBNP6L/view

- **엔진**: Unreal Engine 5.5
- **기술**: C++, Blueprint, Git

**핵심 구현**
- Weapon Base + Component 구조 설계
  - WeaponComponent / StatusComponent 등 컴포넌트 기반 구조로 기능을 분리하고, ACWeapon 베이스 클래스를 통해 장착·조준·발사·재장전 로직을 통합 관리하도록 설계
- 발사 및 데미지 처리 파이프라인 구현
  - LineTrace / Projectile 기반 충돌 처리 후 HitData → TakeDamage 흐름으로 연결되는 FPS 전투 시스템 구현
- Aim / Recoil / 카메라 연출 구현
  - Timeline + Curve 기반 FOV 보간을 통해 조준(Aim) 시스템을 구현하고 반동(Recoil), 카메라 쉐이크 등 FPS 전투 연출을 구현
    
**포인트**
- 컴포넌트 기반 설계를 통해 캐릭터 기능을 모듈화하여 유지보수성과 확장성 확보
- Weapon Base Class 설계를 통해 다양한 무기 시스템을 공통 구조로 통합
- 애니메이션 몽타주와 상태(State) 충돌 문제를 Delegate 기반 상태 복구 로직으로 해결
