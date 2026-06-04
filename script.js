document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            navMenu.classList.remove('active');

            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetSection = document.querySelector(href);

                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 70;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    function animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-bar');

        skillBars.forEach(bar => {
            const rect = bar.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            if (rect.top <= windowHeight * 0.8) {
                const level = bar.getAttribute('data-level');
                bar.style.width = level + '%';
            }
        });
    }

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                if (entry.target.id === 'skills') {
                    animateSkillBars();
                }
            }
        });
    }, { threshold: 0.1 });

    const animatedElements = document.querySelectorAll('section, .project-card, .skill-item');
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    function updateNavbarBackground() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(26, 26, 26, 0.95)';
            navbar.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
        } else {
            navbar.style.background = 'rgba(26, 26, 26, 0.85)';
            navbar.style.boxShadow = 'none';
        }
    }

    window.addEventListener('scroll', updateNavbarBackground);
    window.addEventListener('scroll', animateSkillBars);

    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const formData = new FormData(contactForm);
            const name = formData.get('name').trim();
            const email = formData.get('email').trim();
            const message = formData.get('message').trim();
            const status = contactForm.querySelector('.form-status');

            if (!name || !email || !message) {
                if (status) {
                    status.textContent = '이름, 이메일, 메시지를 모두 입력해주세요.';
                }
                return;
            }

            const subject = `[Portfolio] ${name}님의 문의`;
            const body = [
                `이름: ${name}`,
                `이메일: ${email}`,
                '',
                '메시지:',
                message
            ].join('\n');

            window.location.href = `mailto:gksrudtlr2@icloud.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

            if (status) {
                status.textContent = '메일 앱이 열리면 내용을 확인한 뒤 전송해주세요.';
            }
        });
    }
});

const projectDetails = {
    Solo: {
        title: '🌸 Blossom Of Shadow',
        subtitle: 'Unreal 개인 프로젝트',
        description: 'Unreal Engine 5.4 기반으로 구현한 3D 액션/전투 중심 포트폴리오입니다. 게임 클라이언트 개발 전반의 이해와 엔진의 사용 법을 익히는 것을 목표로 구성했습니다.',
        image: 'image/BlossomOfShadow/mqdefault.webp',
        github: 'https://github.com/GyungSikHan/BlossomOfShadow',
        youtube: 'https://youtu.be/sI_5kmsh7MY?si=c9rURz7Vihq2td_J',
        project: 'https://drive.google.com/file/d/1LRnWCWV3obmQORMKDY8yV8YeIxzddGuA/view?usp=sharing',
        features: [
            '1인 개발로 전투, AI, 무기, UI 시스템 등 전반의 구조 설계 및 구현',
            'Combat/Weapon 시스템 구현: 무기 장착, 기본 콤보, 공중 콤보, 패링 판정 로직',
            '무기별 스킬 시스템 설계: CSkills 기반 Aura, BlackHole, Meteor, AirCombo 등 구현',
            'Behavior Tree 기반 Boss/Team AI 구현: Perception, Blackboard, Team ID, Boss Attack Task',
            'Level Sequence를 활용한 Portal/Cinematic 컷씬과 Boss UI 연동'
        ],
        details: [
            {
                title: '1인 개발 구조 설계',
                subtitle: '전투, AI, 무기, UI, 이벤트 흐름을 시스템 단위로 나누어 구현',
                description: 'Unreal Engine 5.4와 C++ 기반으로 3D 액션 RPG의 핵심 플레이 루프를 혼자 설계하고 구현했습니다. 캐릭터 본체에 모든 기능을 몰아넣지 않고, WeaponComponent, MontageComponent, TargetComponent, ZoomComponent, FeetComponent 등으로 역할을 분리했습니다.',
                image: 'image/BlossomOfShadow/image 171.png',
                tags: [
                    ['개발 범위', '전투, AI, 무기, 스킬, UI, 컷씬, 보스전 흐름 전반 구현'],
                    ['구조 분리', '캐릭터 기능을 Component와 Interface 단위로 분리'],
                    ['데이터 관리', 'Montage DataTable과 Weapon Asset을 활용해 코드 수정 부담 감소'],
                    ['플레이 흐름', '탐색, 전투, 보스맵 진입, 결과 UI까지 이어지는 루프 구성']
                ],
                implementation: [
                    ['CCharacter', 'Montage, Weapon, State, Status, Target 컴포넌트를 조합해 공통 캐릭터 기반 구성'],
                    ['CPlayer', 'Enhanced Input으로 공격, 스킬, 타겟팅, 줌, 회피 입력을 각 컴포넌트 함수에 연결'],
                    ['MontageComponent', 'FTableRowBase 기반 FMontagesData로 상태별 애니메이션 재생 정보를 DataTable에서 관리'],
                    ['UI 연동', '보스 체력바, 결과창, 무기 퀵슬롯 등 게임 진행 상태를 UI에 반영']
                ]
            },
            {
                title: 'Combat / Weapon 시스템',
                subtitle: '무기 장착, 기본 콤보, 공중 콤보, 패링 판정을 포함한 전투 흐름 구현',
                description: '무기 Mesh와 장착 방식은 Attachment에서 관리하고, 장착/해제는 Equipment, 공격 흐름은 DoAction/Combo로 분리했습니다. 공중 콤보와 패링은 AnimNotifyState와 스킬 클래스를 이용해 입력 타이밍과 판정 구간을 제어했습니다.',
                image: 'image/BlossomOfShadow/image 153.png',
                tags: [
                    ['Attachment', '무기별 Mesh와 Socket Attach 로직 분리'],
                    ['Equipment', '무기 장착/해제 책임을 별도 클래스로 구성'],
                    ['AirCombo', '공중 전투용 충돌체와 LaunchCharacter 보간으로 연속 공격 처리'],
                    ['Parry', 'AnimNotifyState_Parry로 패링 가능 구간을 열고 Defence 스킬에서 판정']
                ],
                implementation: [
                    ['AttachTo', 'OwnerCharacter Mesh의 지정 Socket에 무기를 Attach하도록 공통 함수화'],
                    ['Combo 처리', 'CDoAction_Combo에서 EnableCombo/DisableCombo와 Index를 관리해 연속 공격 흐름 구현'],
                    ['AirCombo 판정', 'CAnimNotifyState_SkillCombo에서 AirCombo 스킬을 캐스팅해 충돌 시작/종료 타이밍을 제어'],
                    ['Parry 판정', 'CAnimNotifyState_Parry가 SetParry(true/false)를 호출하고, CSkills_Defence에서 bParry 상태일 때 반격 처리']
                ]
            },
            {
                title: '무기별 스킬 시스템',
                subtitle: 'CSkills 기반으로 무기와 분리된 액션 스킬 구조 설계',
                description: '스킬 입력을 WeaponComponent에서 호출하고, CSkills를 상속받은 개별 스킬 클래스에서 Pressed/Released/Begin/End/Tick 흐름을 구현했습니다. 무기별로 Aura, BlackHole, Meteor, Ground Smash, Bow Zooming, AirCombo, Parry 등 다른 액션을 확장할 수 있게 구성했습니다.',
                image: 'image/BlossomOfShadow/image 203.png',
                tags: [
                    ['공통 구조', 'Skill_Pressed / Skill_Released로 입력 단계 분리'],
                    ['Blueprint 연동', 'BlueprintNativeEvent로 C++/Blueprint 확장성 확보'],
                    ['무기별 확장', 'Weapon Asset의 SkillsClass를 통해 장착 무기에 맞는 스킬 구성'],
                    ['액션 스킬', 'Aura, BlackHole, Meteor, Ground Smash, AirCombo, Parry 등 구현']
                ],
                implementation: [
                    ['CSkills', '모든 스킬이 상속하는 UObject 기반 클래스로 입력, 시작, 종료, Tick 흐름 제공'],
                    ['입력 분리', 'Pressed와 Released를 나눠 차징/조준/발동형 스킬을 모두 처리 가능하게 구성'],
                    ['WeaponComponent', 'Skill1/Skill2 입력 시 현재 장착 무기의 Skills 인스턴스를 가져와 Skill_Pressed 호출'],
                    ['개별 스킬', 'CSkills_Meteor, CSkills_Hammer02, CSkills_Bow_Zomming 등은 공통 흐름을 따르고 세부 효과만 구현']
                ]
            },
            {
                title: 'Boss / Team AI',
                subtitle: 'Behavior Tree 기반 보스 패턴과 Team ID 기반 적대 판정 구현',
                description: 'AIController에서 Perception으로 감지한 대상을 Team ID로 필터링하고 Blackboard Target으로 등록했습니다. 보스는 Behavior Tree Task에서 공격 타입을 분기해 콤보, 투사체, 공중 공격, Ground Smash, Warp 등 패턴을 실행하도록 구성했습니다.',
                image: 'image/BlossomOfShadow/image 211.png',
                tags: [
                    ['Perception', 'Sight, Hearing, Damage 감지를 이용해 타겟 후보 수집'],
                    ['Team ID', 'SetGenericTeamId와 GetTeam()으로 아군/적군 판정'],
                    ['Boss Attack', 'CBTT_BossAttack에서 공격 타입별 패턴 실행'],
                    ['Boss UI', '보스 상태에 따라 Boss HP Bar 표시/갱신']
                ],
                implementation: [
                    ['OnPossess', 'Enemy의 TeamID를 가져와 Controller에 SetGenericTeamId로 설정하고 Blackboard/BehaviorTree 초기화'],
                    ['OnPerceptionUpdated', '감지 Actor를 CCharacter로 캐스팅한 뒤 Team 값이 다를 때만 Target으로 등록'],
                    ['CBTT_BossAttack', 'EBossAttacks enum에 따라 Combo1, Projectile, AerialAttack, GroundSmash, Warp 등 분기'],
                    ['CEnemy_AI', 'bBoss 상태일 때 GameInstance를 통해 Boss UI 표시와 체력 갱신 처리']
                ]
            },
            {
                title: 'Level Sequence 컷씬 / 이벤트',
                subtitle: 'Portal과 CinematicActor를 통한 컷씬 재생, 입력 차단, 맵 전환 흐름 구현',
                description: 'Level Sequence를 사용해 포탈 진입과 이벤트 컷씬을 구성했습니다. 플레이어가 충돌체에 진입하면 입력을 차단하고 컷씬을 재생한 뒤, OnFinished 델리게이트에서 맵 이동 또는 이벤트 종료 처리를 수행했습니다.',
                image: 'image/BlossomOfShadow/image 270.png',
                tags: [
                    ['Portal', '충돌 시 Level Sequence 재생 후 BossMap으로 전환'],
                    ['CinematicActor', '보이지 않는 충돌체 기반 이벤트 컷씬 액터 구성'],
                    ['입력 제어', '컷씬 중 DisableInput으로 플레이어 조작 차단'],
                    ['Delegate', 'LevelSequencePlayer OnFinished에 End 함수를 연결해 후속 처리']
                ],
                implementation: [
                    ['CPortal', 'OnComponentBeginOverlap에서 LevelSequencePlayer를 재생하고 OnFinished에 End 바인딩'],
                    ['맵 전환', 'CPortal::End에서 UGameplayStatics::OpenLevel로 BossMap 진입 처리'],
                    ['CCinematicActor', '파티클/메쉬 없이 Box 충돌체만 가진 이벤트 트리거 액터로 구성'],
                    ['Sequence 제어', '컷씬 종료 시 입력 복구/Stop 처리로 게임 진행 흐름을 정리']
                ]
            }
        ]
    },
    FinalTeam: {
        title: 'EMBER : The Eternal Blizzard',
        subtitle: 'Unreal Survival Action 팀 프로젝트 / 6인',
        description: 'Unreal Engine 5.5 기반 6인 팀 Survival Action 프로젝트입니다. AI 전투 시스템, 방어구 장착 Replication, Main UI 진입 흐름을 중심으로 구현했습니다.',
        image: 'image/Ember/image.png',
        github: 'https://github.com/GyungSikHan/1st-Team4-Final-Project',
        youtube: 'https://youtu.be/1DuNwBaC0Xg?si=53Nf7StepMJgE4cC',
        project: 'https://drive.google.com/file/d/1PpsPOJKj8707m6JqEeOPmhDDgPz4zifB/view',
        features: [
            'AI 전투 시스템 설계 및 구현: Combat / Weapon / Damage / Sound 로직 분리',
            'Behavior Tree 기반 Dragon AI 공격 로직 구현: InProgress + FinishLatentTask로 상태 정지 문제 해결',
            'FDamageData 기반 데이터형 Damage 시스템과 AI Weapon 충돌 판정 구현',
            'ArmorComponent 기반 플레이어 방어구 장착 및 Replication 동기화 구현',
            'Main UI 에셋과 GameMode / GameInstance 기반 게임 진입 흐름 연동'
        ],
        details: [
            {
                title: 'AI 전투 시스템 구조화',
                subtitle: 'Combat / Weapon / Damage / Sound 책임을 분리한 AI 전투 구조 설계',
                description: 'AI 전투 기능을 하나의 클래스에 몰아넣지 않고 Combat, Weapon, Damage, Sound 흐름으로 나누어 구성했습니다. Behavior Tree Task는 공격 상태 진행을 담당하고, Weapon은 충돌 구간, Damage는 데이터 기반 타격 처리, Sound는 AnimNotify 기반 연출 호출을 맡도록 분리했습니다.',
                image: 'image/Ember/image4.png',
                tags: [
                    ['Combat', 'BT Task에서 공격 몽타주 실행과 AI 상태 흐름 제어'],
                    ['Weapon', 'AI 전용 Weapon Actor에서 충돌체 수집과 공격 판정 처리'],
                    ['Damage', 'FDamageData로 데미지, 피격 이펙트, 사운드, 몽타주를 데이터화'],
                    ['Sound', 'AnimNotify_AISound에서 SoundType을 전달해 AI별 사운드 재생']
                ],
                implementation: [
                    ['BTT_DragonAttack', 'Dragon 원거리 공격 몽타주를 재생하고 Behavior Tree Task 완료 시점을 몽타주 종료에 맞춤'],
                    ['CAI_Weapon', 'ShapeComponent 기반 충돌체를 동적으로 수집하고 공격 구간에만 활성화'],
                    ['GameData', 'FDamageData 구조체로 Damage, HitEffect, HitSound, Montage를 묶어 밸런싱 데이터로 관리'],
                    ['CAnimNotify_AISound', 'Notify에서 BaseAI의 PlaySound(SoundType)를 호출해 애니메이션 타이밍과 사운드 연출 연결']
                ]
            },
            {
                title: 'Behavior Tree 공격 Task / 상태 정지 문제 해결',
                subtitle: '공격 몽타주 종료 시점에 BT Task를 완료해 Dragon AI 정지 문제 해결',
                description: 'Dragon AI가 공격 후 다음 행동으로 넘어가지 못하고 멈추는 문제를 Task 완료 시점과 몽타주 복귀 타이밍의 불일치로 분석했습니다. ExecuteTask에서 즉시 Succeeded를 반환하지 않고 InProgress 상태를 유지한 뒤, 몽타주 종료 콜백에서 FinishLatentTask를 호출하도록 수정했습니다.',
                image: 'image/Ember/image4.gif',
                tags: [
                    ['문제 원인', 'BT Task가 너무 빨리 종료되어 몽타주 기반 상태 복귀와 타이밍 불일치 발생'],
                    ['InProgress', 'ExecuteTask가 공격 진행 중에는 EBTNodeResult::InProgress 반환'],
                    ['Delegate', 'Montage_SetEndDelegate로 몽타주 종료 콜백 등록'],
                    ['FinishLatentTask', 'OnMontageEnded에서 성공/실패를 나누어 BT Task 완료 처리']
                ],
                implementation: [
                    ['Montage Section', 'Fly -> Attack -> Land 섹션을 순서대로 이어 Dragon 공격 연출 구성'],
                    ['Movement Control', '공격 중 Flying 모드와 GravityScale 조정 후 AIController StopMovement 호출'],
                    ['Timeout 보완', '몽타주 길이를 계산해 Timer 기반 OnMontageTimeout 완료 경로 추가'],
                    ['상태 안정화', '몽타주 종료 후 Behavior Tree가 다음 노드로 자연스럽게 진행되도록 완료 시점 통일']
                ]
            },
            {
                title: 'AI Weapon 충돌 / Damage 시스템',
                subtitle: '공격 시점에만 충돌체를 활성화하고 중복 타격을 방지하는 판정 구조',
                description: 'AI Weapon이 가진 충돌체를 Spawn 시점에 수집하고, 평소에는 비활성화했다가 공격 Notify 구간에서만 활성화하도록 구성했습니다. Overlap 발생 시 소유자와 같은 클래스는 제외하고, 이미 맞은 대상은 Hitted 배열로 중복 처리되지 않게 막은 뒤 현재 공격 인덱스의 HitData로 데미지를 전달했습니다.',
                image: 'image/Ember/image4.gif',
                tags: [
                    ['Collision 수집', 'Root 하위 ShapeComponent를 탐색해 Overlap 이벤트 바인딩'],
                    ['공격 구간', 'OnCollision / OffCollision로 공격 시점에만 QueryAndPhysics 활성화'],
                    ['중복 방지', 'Hitted 배열로 같은 공격 내 동일 대상 다중 피격 방지'],
                    ['Damage 전달', 'HitDatas[CurrAttackIndex].SendDamage로 공격별 데미지 데이터 적용']
                ],
                implementation: [
                    ['SpawnPlay', 'OwnerCharacter, State, Movement 컴포넌트를 확보하고 충돌체 이벤트를 초기화'],
                    ['OnComponentBeginOverlap', '소유자, null, 같은 클래스, 이미 맞은 대상을 제외한 뒤 데미지 처리'],
                    ['CurrAttackIndex', '공격 패턴별 HitData를 선택해 다른 데미지/이펙트/사운드 적용 가능'],
                    ['OffCollision 기본값', '무기가 생성되면 충돌을 먼저 꺼두어 의도하지 않은 접촉 판정 방지']
                ]
            },
            {
                title: 'ArmorComponent 장비 Replication',
                subtitle: '방어구 장착 상태를 서버 권한과 OnRep 기반으로 동기화',
                description: '플레이어 방어구 장착을 Component로 분리하고, 서버에서 장착 데이터를 갱신한 뒤 Replicated Array와 OnRep 콜백으로 클라이언트 외형을 동기화했습니다. 장비 변경 시 MeshPath와 ArmorType을 저장해 늦게 접속한 클라이언트도 동일한 장착 상태를 재구성할 수 있게 했습니다.',
                image: 'image/Ember/image6.gif',
                tags: [
                    ['Component 분리', 'UArmorComponent에서 방어구 장착/해제와 외형 갱신 담당'],
                    ['Replication', 'ArmorDataArray를 DOREPLIFETIME으로 복제'],
                    ['OnRep', 'OnRep_ArmorDataArray에서 UpdateArmorVisuals 호출'],
                    ['Late Join 대응', 'MulticastInitializeArmor와 ForceNetUpdate로 현재 장착 상태 전파']
                ],
                implementation: [
                    ['DetermineEquip', 'ItemFragment의 ArmorMesh 경로를 읽어 장착/해제 RPC 흐름으로 전달'],
                    ['EquipORUnEquip', '서버에서 SkeletalMeshComponent를 찾아 장착/교체/해제 처리 후 ArmorDataArray 갱신'],
                    ['UpdateArmorVisuals', '클라이언트에서 MeshPath로 SkeletalMesh를 로드하고 LeaderPoseComponent를 설정'],
                    ['해제 처리', '복제 배열에 없는 ArmorType의 Mesh를 제거해 장착 해제 상태까지 동기화']
                ]
            },
            {
                title: 'AI Sound System',
                subtitle: 'AnimNotify와 SoundType 기반으로 AI별 사운드 재생 타이밍을 분리',
                description: 'AI 공격, 피격, 행동 연출에서 사운드가 애니메이션 타이밍과 맞게 재생되도록 AnimNotify 기반 사운드 호출 구조를 구성했습니다. Notify에서는 사운드 종류만 전달하고, 실제 재생은 BaseAI의 PlaySound에서 처리하도록 분리해 AI별 사운드 에셋과 감쇠 설정을 관리할 수 있게 했습니다.',
                image: 'image/Ember/image7.gif',
                tags: [
                    ['AnimNotify', 'CAnimNotify_AISound에서 애니메이션 Notify 타이밍에 사운드 호출'],
                    ['SoundType', 'AISoundCategory 값을 전달해 공격, 피격 등 상황별 사운드 구분'],
                    ['BaseAI 처리', 'Notify는 BaseAI를 가져와 PlaySound(SoundType)만 호출하도록 역할 분리'],
                    ['위치 기반 재생', 'SpawnSoundAtLocation과 SoundAttenuation으로 AI 위치에서 사운드 재생']
                ],
                implementation: [
                    ['CAnimNotify_AISound', 'MeshComp의 Owner를 ABaseAI로 캐스팅하고 SoundType을 넘겨 PlaySound 호출'],
                    ['Null 방어', 'MeshComp 또는 AI가 nullptr인 경우 로그를 남기고 사운드 호출을 중단'],
                    ['AISounds 배열', 'AISoundCategory 인덱스로 AI별 USoundBase 에셋을 선택'],
                    ['SoundAttenuation', '감쇠 에셋이 없거나 사운드가 비어 있으면 재생하지 않아 런타임 오류를 방지']
                ]
            },
            {
                title: 'Main UI / 게임 진입 흐름',
                subtitle: '구매 UI 에셋을 프로젝트 구조에 맞게 연결하고 실행 진입점을 정리',
                description: 'Main UI 에셋을 단순 배치하는 데서 끝내지 않고, 프로젝트 실행 시 메인 메뉴 레벨로 진입하도록 Default Map을 설정했습니다. GameInstance와 GameMode 설정을 프로젝트 흐름에 맞춰 연결해 메인 메뉴에서 게임 시작으로 이어지는 기본 진입 구조를 구성했습니다.',
                image: 'image/Ember/image.png',
                tags: [
                    ['Default Map', 'GameDefaultMap을 MainMenu 테스트 레벨로 설정'],
                    ['GameInstance', 'EmberGameInstance를 프로젝트 전역 상태 관리 진입점으로 연결'],
                    ['GameMode', 'BP_EmberGameMode를 GlobalDefaultGameMode로 설정'],
                    ['UI Flow', '메인 메뉴 -> 게임 시작으로 이어지는 실행 흐름 구성']
                ],
                implementation: [
                    ['DefaultEngine.ini', 'EditorStartupMap과 GameDefaultMap을 MainMenu 레벨로 지정'],
                    ['ProMainMenuV3', '구매한 Main UI 에셋의 레벨/위젯을 프로젝트 실행 흐름에 연동'],
                    ['EmberGameInstance', '메뉴와 게임 진행 간 필요한 전역 흐름을 연결할 수 있는 구조 확보'],
                    ['BP_EmberGameMode', '프로젝트 GameMode 기준으로 게임 시작 후 플레이 흐름이 이어지도록 설정']
                ]
            }
        ]
    },
    SecondTeam: {
        title: 'SYMBIO Project',
        subtitle: 'Unreal FPS 팀 프로젝트 / 4인',
        description: 'Unreal Engine 5.5 기반 4인 팀 FPS 프로젝트입니다. Weapon Base와 Component 구조를 중심으로 무기 장착, 조준, 발사, 데미지 처리, 카메라 연출 흐름을 설계하고 구현했습니다.',
        image: 'image/Symbio/image15.png',
        github: 'https://github.com/GyungSikHan/1st-Team14-CH3-Project',
        youtube: 'https://youtu.be/tJcozATuAgQ?si=a0gReyRljIx07e7P',
        project: 'https://drive.google.com/file/d/1wuGg5KNYLVXD0ZXs_h4th62TAfnBNP6L/view',
        features: [
            'Weapon Base + Component 구조 설계',
            'LineTrace + Projectile + Delegate 기반 발사 및 데미지 처리 파이프라인 구현',
            'Timeline + Curve 기반 Aim, Recoil, Camera Shake, 데칼/파티클 연출 구현',
            '팀장으로서 몽타주 상태 복구, 수류탄 투척, 팀원 스킬 충돌 문제 해결 지원'
        ],
        details: [
            {
                title: 'Weapon Base + Component 구조',
                subtitle: 'UCWeaponComponent와 ACWeapon 베이스 클래스로 무기 장착/조준/발사/재장전 흐름 통합',
                description: '무기별 로직 중복을 줄이기 위해 ACWeapon 베이스 클래스를 두고, UCWeaponComponent가 현재 장착 무기에게 명령을 전달하는 구조로 설계했습니다. 캐릭터는 WeaponComponent를 통해 무기 타입 변경, 발사, 조준, 재장전, 탄창 처리 등을 일관된 방식으로 호출합니다.',
                image: 'image/Symbio/image7.png',
                tags: [
                    ['WeaponComponent', '현재 무기 타입을 판단하고 Equip/Unequip, Fire, Aim, Reload 명령을 위임'],
                    ['ACWeapon Base', '장착, 해제, 조준, 발사, 재장전, 피격 연출 공통 기능 관리'],
                    ['HUD 연동', '무기 변경 시 OnWeaponNameChanged, 탄약 변경 시 OnAmmoChanged 델리게이트 활용'],
                    ['확장성', 'Rifle, Pistol, Knife, Grenade가 같은 인터페이스로 동작하도록 구성']
                ],
                implementation: [
                    ['SetMode', '같은 타입 입력 시 장착 해제, 다른 타입 입력 시 기존 무기 CanUnequip 확인 후 새 무기 Equip'],
                    ['Command Hub', 'Begin_Equip, Begin_Fire, BeginAim, Reload 등이 GetCurrentWeapon()을 통해 현재 무기로 전달'],
                    ['무기 생성', 'BeginPlay에서 WeaponClasses를 순회하며 Owner 기준으로 무기 Actor를 Spawn해 배열로 관리'],
                    ['상태 제한', 'CanEquip/CanFire/CanReload/CanAim에서 장착 중, 재장전 중, 발사 중, 인벤토리 상태 등을 검사']
                ]
            },
            {
                title: '발사 및 데미지 처리 파이프라인',
                subtitle: 'LineTrace, Projectile, Bullet Delegate, HitData, TakeDamage로 이어지는 FPS 데미지 흐름',
                description: '발사 순간 카메라 방향 기준 LineTrace로 조준 방향과 충돌 지점을 계산하고, Muzzle에서 Bullet을 Spawn한 뒤 Bullet의 OnHit 델리게이트를 ACWeapon::OnBullet에 연결했습니다. 최종 데미지는 FHitData::SnedDamage를 통해 TakeDamage로 전달됩니다.',
                image: 'image/Symbio/image10.png',
                tags: [
                    ['LineTrace', '카메라 ForwardVector 기준으로 조준 방향과 HitResult 계산'],
                    ['Projectile', 'Muzzle_Bullet 위치에서 Bullet Spawn 후 Shoot(direction)으로 발사'],
                    ['Delegate', 'Bullet의 OnHit 이벤트를 Weapon의 OnBullet에 바인딩'],
                    ['Damage', 'FHitData가 DamageEvent를 구성하고 대상 Character에 TakeDamage 전달']
                ],
                implementation: [
                    ['OnFireing', 'FireMontage 재생 후 카메라 Transform과 RecoilAngle을 반영해 발사 방향 계산'],
                    ['Hit 연출', 'HitResult가 BlockingHit이면 Decal과 Particle을 Spawn해 피격 위치 피드백 제공'],
                    ['CBullet', 'ProjectileMovementComponent로 이동하고 Capsule Hit 발생 시 OnHit Broadcast 후 Destroy'],
                    ['OnBullet', 'ACWeapon::OnBullet에서 HitDatas[0].SnedDamage로 공격자/가해자/피격자 정보를 전달']
                ]
            },
            {
                title: 'Aim / Recoil / 카메라 연출',
                subtitle: 'Timeline + Curve 기반 FOV 보간과 반동, 카메라 쉐이크, 데칼/파티클 연출',
                description: '조준 시 SpringArm과 Camera 값을 저장/복구하고 Timeline Curve로 FOV를 보간했습니다. 발사 시에는 RecoilAngle로 탄 퍼짐을 만들고, AddControllerPitchInput과 CameraShake로 FPS 전투 피드백을 강화했습니다.',
                image: 'image/Symbio/image-5.png',
                tags: [
                    ['Aim', 'AimData/BaseData로 SpringArm 길이, SocketOffset, FOV 상태 관리'],
                    ['Timeline', 'AimCurve를 UTimelineComponent에 연결해 조준 전환 보간'],
                    ['Recoil', 'RandomUnitVectorInConeInDegrees와 Pitch Input으로 반동 처리'],
                    ['Camera Shake', '조준 여부에 따라 AimCameraShake와 일반 CameraShake를 분기']
                ],
                implementation: [
                    ['BeginAim', 'CanAim 검사 후 Breath Sound를 재생하고 Timeline을 PlayFromStart'],
                    ['EndAim', '조준 해제 시 BaseData를 적용하고 숨소리 종료 사운드 처리'],
                    ['OnAiming', 'Timeline Output으로 AimData.FieldOfView와 BaseData.FieldOfView를 Lerp'],
                    ['Fire Feedback', 'Muzzle Flash, Eject Particle, Fire Sound, Hit Decal/Particle, CameraShake를 한 발사 흐름에 통합']
                ]
            },
            {
                title: '팀장으로서 문제 해결',
                subtitle: '몽타주 상태 복구, 수류탄 물리 투척, 팀원 스킬 충돌 문제 해결 지원',
                description: '팀 프로젝트 진행 중 전투/스킬 흐름을 막는 문제를 원인 단위로 분석하고 해결했습니다. 몽타주 중단으로 State가 복구되지 않는 문제는 OnMontageEnded 델리게이트로 보완했고, 수류탄은 물리 기반 투척으로 수정했으며, 팀원의 SymBio 스플라인 공격 충돌 문제는 LineTrace의 HitActor를 활용하는 방향으로 해결했습니다.',
                image: 'image/Symbio/image-4.png',
                tags: [
                    ['Montage 복구', 'Notify End가 호출되지 않는 상황을 OnMontageEnded로 보완'],
                    ['Grenade', 'ProjectileMovement 대신 SimulatePhysics + AddImpulse + AddTorque로 자연스러운 투척 구현'],
                    ['팀원 지원', 'Spline 공격에서 HitActor를 가져오지 못하는 문제를 LineTrace 결과 활용으로 해결'],
                    ['리더 역할', '기능 구현뿐 아니라 팀원의 병목 이슈를 함께 분석하고 해결 방향 제시']
                ],
                implementation: [
                    ['HandleAnyMontageEnded', 'Equip/Reload/Grenade/Fist Montage 이름별로 Begin/End 함수를 강제 호출해 상태 복구'],
                    ['CWeapon_Throw', 'BeginAction에서 장착된 Grenade를 Detach하고 카메라 ForwardVector 방향으로 Shoot 호출'],
                    ['Grenade Shoot', 'Mesh 물리 시뮬레이션 활성화 후 AddImpulse와 AddTorqueInRadians로 포물선/회전 연출'],
                    ['Spline Damage', '스플라인 충돌 Actor를 직접 얻지 못해 LineTrace의 HitResult/HitActor를 CCharacter로 캐스팅 후 데미지 전달']
                ]
            }
        ]
    },
    FirstTeam: {
        title: 'Text RPG',
        subtitle: 'C++ 팀 프로젝트 / 4인',
        description: 'C++ 콘솔 기반 Text RPG 팀 프로젝트입니다. Singleton 기반 Game Manager를 설계하고, 전투/상점/인벤토리/플레이어 정보 등 팀원이 구현한 기능을 하나의 게임 루프로 연결했습니다.',
        image: 'image/TextRPG/image.png',
        github: 'https://github.com/GyungSikHan/Let_sDoItFirst',
        youtube: 'https://youtu.be/QqcPvBTLAaA?si=Q8kETZwgl9uYdcV0',
        project: 'https://drive.google.com/file/d/1T6DfcRIsckD-XOfbujmkS645I34GVanF/view?usp=sharing',
        features: [
            'Singleton 기반 Game Manager 설계',
            '상태 전환 기반 게임 루프 구조 구현',
            '전투 / 상점 / 인벤토리 / 플레이어 정보 Console UI 출력 구조 설계',
            'Character, Monster, Shop, Item 등 팀원 구현 기능을 Game Manager에 연결',
            '디버그 모드, 보스 진입, 사망/클리어 후 재시작 흐름 구현'
        ],
        details: [
            {
                title: 'Singleton 기반 Game Manager',
                subtitle: '게임 전체 흐름을 하나의 진입점에서 관리하는 GameMGR 설계',
                description: 'Text RPG의 실행 흐름을 GameMGR 중심으로 구성했습니다. 외부에서는 Create와 GetInstance를 통해 GameMGR에 접근하고, 생성자/복사 대입을 제한해 게임 진행을 관리하는 인스턴스가 하나만 유지되도록 설계했습니다.',
                image: 'image/TextRPG/image.png',
                tags: [
                    ['Singleton', 'static GameMGR* instance와 Create / GetInstance로 단일 Manager 접근 구조 구성'],
                    ['생성 제한', '생성자 private, 복사 생성자와 대입 연산자 delete 처리'],
                    ['중앙 관리', 'StartGame, Play, Battle, VisitShop, DisplayInventory를 GameMGR에서 호출'],
                    ['공통 상태', 'player, shop, bPlayerDead, bBoss, bDebugMode 등 게임 진행 상태를 Manager에서 보관']
                ],
                implementation: [
                    ['GameMGR::Create', 'instance가 nullptr일 때만 new GameMGR를 수행해 중복 생성을 방지'],
                    ['GameMGR::GetInstance', 'main에서 GameMGR::GetInstance()->StartGame(true) 형태로 게임 시작'],
                    ['Init', 'Shop 객체를 생성해 상점 기능을 Game Manager 내부 흐름에 연결'],
                    ['InitCharacter', 'Character Singleton을 가져와 이름 입력과 초기 플레이어 상태 설정을 담당']
                ]
            },
            {
                title: '상태 전환 기반 게임 루프',
                subtitle: '시작 메뉴, 마을, 전투, 상점, 종료/재시작으로 이어지는 콘솔 게임 흐름 구현',
                description: 'StartGame에서 게임 시작/종료를 분기하고, Play 루프에서 마을 메뉴를 반복 출력하며 사용자의 선택에 따라 전투, 상점, 플레이어 정보, 인벤토리, 게임 종료 상태로 전환되도록 구현했습니다. 플레이어 사망이나 보스 클리어 후에는 RestartGame에서 새 게임 또는 디버그 루프로 복귀합니다.',
                image: 'image/TextRPG/image.png',
                tags: [
                    ['StartGame', '게임 시작/종료 입력을 받고 캐릭터 초기화 후 Play 루프로 진입'],
                    ['Play Loop', '마을 메뉴에서 전투, 상점, 상태 확인, 인벤토리, 종료 기능으로 분기'],
                    ['전투 전환', 'Battle에서 일반 몬스터와 보스 몬스터 생성 조건을 분리'],
                    ['재시작 처리', 'PlayerDead / BossDead 이후 RestartGame으로 재시작 또는 디버그 흐름 처리']
                ],
                implementation: [
                    ['입력 검증', 'cin.fail, cin.clear, cin.ignore로 잘못된 입력을 걸러내고 재입력 유도'],
                    ['화면 전환', 'Sleep과 system("cls")를 이용해 콘솔 화면을 단계별로 정리'],
                    ['상태 플래그', 'bPlayerDead, bBoss, bEndDebug를 기준으로 루프 탈출과 재시작 조건 제어'],
                    ['Debug Mode', '0 입력 시 보스 진입 조건을 맞추고 9 입력 시 강제 종료하는 테스트 흐름 추가']
                ]
            },
            {
                title: 'Console UI 출력 구조',
                subtitle: '텍스트 기반 메뉴와 상태 정보를 일관된 형식으로 출력',
                description: '콘솔 환경에서 플레이어가 현재 상태와 선택지를 쉽게 이해할 수 있도록 시작 화면, 마을, 전투, 상점, 인벤토리 메뉴를 구분된 출력 형식으로 구성했습니다. 전투 중에는 플레이어와 몬스터의 HP/공격력을 함께 보여주고, 행동 선택 결과를 바로 출력하도록 만들었습니다.',
                image: 'image/TextRPG/image.png',
                tags: [
                    ['시작 UI', '게임 시작/종료 선택지를 제공하고 이름 입력으로 캐릭터 생성 흐름 연결'],
                    ['마을 UI', '전투, 상점, Player 정보, 인벤토리, 게임 종료 메뉴 출력'],
                    ['전투 UI', 'Player와 Monster의 HP/공격력, 공격/아이템/도망 선택지 출력'],
                    ['상점 UI', '소지금, 구매/판매/나가기 선택지와 아이템 목록 출력']
                ],
                implementation: [
                    ['PrintCharacterInfo', 'Character::displayStatus를 호출해 플레이어 상태 출력'],
                    ['DisplayInventory', 'Character::displayInventory를 호출해 인벤토리 출력'],
                    ['VisitShop', 'Shop::displayItems와 구매/판매 입력 흐름을 GameMGR에서 관리'],
                    ['Attack', '플레이어/몬스터 공격 결과와 데미지를 문장 형태로 출력']
                ]
            },
            {
                title: '팀원 구현 기능 Game Manager 연결',
                subtitle: 'Character, Monster, Shop, Item 기능을 실제 플레이 루프로 통합',
                description: '팀원이 구현한 캐릭터, 몬스터, 아이템, 상점 기능이 따로 동작하는 데서 끝나지 않도록 GameMGR에서 호출 흐름을 묶었습니다. 전투 승리 시 경험치/골드/아이템 획득, 상점 구매/판매, 아이템 사용, 보스 클리어 엔딩까지 하나의 게임 진행으로 이어지게 연결했습니다.',
                image: 'image/TextRPG/image.png',
                tags: [
                    ['Character 연동', '체력, 공격력, 경험치, 골드, 인벤토리, 레벨업 기능 호출'],
                    ['Monster 연동', '랜덤 일반 몬스터와 보스 몬스터 생성 및 사망 판정 처리'],
                    ['Shop 연동', '아이템 구매/판매와 소지금 조건 검사를 GameMGR 흐름에 연결'],
                    ['Item 연동', '인벤토리 아이템 사용과 AttackBoost 지속 효과 복구 처리']
                ],
                implementation: [
                    ['GenerateMonster', 'Goblin, Orc, Troll, Slime 중 하나를 랜덤 생성해 전투에 투입'],
                    ['GenerateBossMonster', '플레이어 레벨 조건에 따라 BossMonster를 생성하고 bBoss 상태 설정'],
                    ['Battle Reward', 'monster->dropEXP, dropGold, dropItem 결과를 player의 경험치/골드/인벤토리에 반영'],
                    ['Shop Flow', 'shop->buyItem / sellItem 호출 전 골드와 인벤토리 조건을 검사해 플레이 흐름 안정화']
                ]
            }
        ]
    }
};

function openModal(projectId) {
    const modal = document.getElementById('projectModal');
    const content = document.getElementById('modal-details-content');
    const project = projectDetails[projectId];

    if (!project) {
        return;
    }

    const featuresHtml = project.features.map(feature => `<li>${feature}</li>`).join('');
    const linksHtml = [
        ['GitHub', project.github],
        ['YouTube', project.youtube],
        ['Project', project.project]
    ]
        .filter(link => link[1])
        .map(link => `<a href="${link[1]}" class="btn btn-secondary" target="_blank" rel="noopener noreferrer">${link[0]}</a>`)
        .join('');

    const detailsHtml = project.details.map((detail, index) => {
        const solutionHtml = detail.tags.map(tag => `
            <p class="feature-line">
                <span class="feature-title">${tag[0]}</span>
                <span class="feature-desc">${tag[1]}</span>
            </p>
        `).join('');
        const implementationItems = detail.implementation || detail.tags;
        const implementationHtml = implementationItems.map(tag => `
            <p class="feature-line">
                <span class="feature-title">${tag[0]}</span>
                <span class="feature-desc">${tag[1]}</span>
            </p>
        `).join('');
        const sectionId = `detail-${projectId}-${index}`;

        return `
        <div class="modal-feature-section" data-section-id="${sectionId}">
            <h3>${index + 1}. ${detail.title}</h3>
            <h4>${detail.subtitle}</h4>
            <p>${detail.description}</p>
            <div class="modal-feature-row ${index % 2 === 0 ? 'reverse' : ''}">
                <div class="text-content">
                    <div class="modal-tabs">
                        <button class="modal-tab active" type="button" data-tab-target="solution">해결 방법</button>
                        <button class="modal-tab" type="button" data-tab-target="implementation">구현 상세</button>
                    </div>
                    <div class="tab-panel active" data-tab-panel="solution">
                        ${solutionHtml}
                    </div>
                    <div class="tab-panel" data-tab-panel="implementation">
                        ${implementationHtml}
                    </div>
                </div>
                <img src="${detail.image}" alt="${detail.title} 이미지">
            </div>
        </div>
    `;
    }).join('');

    content.innerHTML = `
        <div class="new-modal-layout">
            <div class="project-left-column">
                <img src="${project.image}" alt="${project.title} 대표 이미지" class="project-summary-image">
                ${linksHtml}
            </div>
            <div class="vertical-divider"></div>
            <div class="project-right-column">
                <h1>
                    ${project.title}<br>
                    <span style="font-size: 1rem; color: var(--text-color-darker); font-weight: 400;">
                        (${project.subtitle})
                    </span>
                </h1>
                <p style="font-size: 1.1rem; line-height: 1.8; margin-top: 10px; color: var(--text-color); margin-bottom: 20px;">
                    ${project.description}
                </p>
                <h4>주요 기능 및 기여</h4>
                <ul>${featuresHtml}</ul>
            </div>
        </div>
        ${detailsHtml}
    `;

    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('projectModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

window.openModal = openModal;
window.closeModal = closeModal;

window.addEventListener('click', event => {
    const modal = document.getElementById('projectModal');
    if (event.target === modal) {
        closeModal();
    }
});

document.addEventListener('click', event => {
    const tab = event.target.closest('.modal-tab');
    if (!tab) {
        return;
    }

    const section = tab.closest('.modal-feature-section');
    const target = tab.dataset.tabTarget;
    if (!section || !target) {
        return;
    }

    section.querySelectorAll('.modal-tab').forEach(item => {
        item.classList.toggle('active', item === tab);
    });

    section.querySelectorAll('.tab-panel').forEach(panel => {
        panel.classList.toggle('active', panel.dataset.tabPanel === target);
    });
});
