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
});

const projectDetails = {
    Solo: {
        title: '🌸 Blossom Of Shadow',
        subtitle: 'Unreal 개인 프로젝트',
        description: 'Unreal Engine 5.4 기반으로 구현한 3D 액션/전투 중심 포트폴리오입니다. 게임 클라이언트 개발 전반의 이해와 엔진의 사용 법을 익히는 것을 목표로 구성했습니다.',
        image: 'image/web2.jpg',
        github: 'https://github.com/GyungSikHan/BlossomOfShadow',
        youtube: 'https://youtu.be/sI_5kmsh7MY?si=c9rURz7Vihq2td_J',
        project: 'https://drive.google.com/file/d/1LRnWCWV3obmQORMKDY8yV8YeIxzddGuA/view?usp=sharing',
        features: [
            'DirectX11 기반 렌더링 파이프라인 구성',
            '캐릭터 이동, 공격, 피격 상태 구현',
            'ImGui 기반 맵툴 제작',
            'Instancing 및 Frustum Culling 최적화'
        ],
        details: [
            {
                title: '캐릭터 핵심 조작 및 전투 로직',
                subtitle: 'FSM 기반 상태 제어와 충돌 판정을 통한 3D 액션 캐릭터 시스템 구현',
                description: '이동, 점프, 공격 상태를 연결하고 충돌 판정을 통해 조작과 전투가 자연스럽게 이어지는 플레이 흐름을 구성했습니다.',
                image: 'image/web2.jpg',
                tags: [
                    ['상태 제어', 'Idle / Move / Attack / Hit 상태 전환'],
                    ['충돌 판정', '공격 범위와 적 피격 판정 처리'],
                    ['전투 피드백', '애니메이션과 상태 변화를 연동']
                ]
            },
            {
                title: 'ImGui 기반 맵툴 제작',
                subtitle: '실행 중 오브젝트 배치와 편집이 가능한 레벨 제작 도구 구현',
                description: '반복적인 레벨 배치 작업을 줄이기 위해 오브젝트의 위치, 회전, 스케일을 런타임에서 수정할 수 있는 도구를 구성했습니다.',
                image: 'image/web2.jpg',
                tags: [
                    ['편집 기능', 'Transform 값 실시간 조정'],
                    ['작업 효율', '코드 수정 없이 배치 결과 확인'],
                    ['확장 구조', '오브젝트 타입별 편집 기능 추가 가능']
                ]
            },
            {
                title: '렌더링 최적화',
                subtitle: 'Instancing과 Frustum Culling을 활용한 렌더링 비용 절감',
                description: '보이지 않는 오브젝트를 제외하고 반복 렌더링 비용을 줄여 안정적인 프레임을 유지하는 것을 목표로 최적화했습니다.',
                image: 'image/web2.jpg',
                tags: [
                    ['Culling', '카메라 영역 밖 오브젝트 제외'],
                    ['Instancing', '동일 Mesh 렌더링 비용 절감'],
                    ['성능 개선', '반복 렌더링 병목 완화']
                ]
            }
        ]
    },
    FinalTeam: {
        title: 'EMBER : The Eterna Blizzard',
        subtitle: 'Unreal Survival Action 팀 프로젝트 / 6인',
        description: 'Unity 기반 Top-Down RPG 프로젝트입니다. 전투, 아이템, NPC, 퀘스트 흐름을 하나의 플레이 루프로 구성했습니다.',
        image: 'image/web2.jpg',
        github: 'https://github.com/GyungSikHan/1st-Team4-Final-Project',
        youtube: 'https://youtu.be/1DuNwBaC0Xg?si=53Nf7StepMJgE4cC',
        project: 'https://drive.google.com/file/d/1PpsPOJKj8707m6JqEeOPmhDDgPz4zifB/view',
        features: [
            '탑다운 3D 컨트롤 구현',
            'AI 및 전투 시스템 구성',
            '아이템과 인벤토리 데이터 관리',
            'NPC 대화 및 퀘스트 진행 구현'
        ],
        details: [
            {
                title: 'Firebase Authentication 기반 사용자 인증 시스템',
                subtitle: '비동기 인증 처리 및 상태 변경 이벤트를 활용한 로그인 / 회원 관리 구조',
                description: '게임 내 사용자 계정 기반 기능을 제공하기 위해 인증 상태 변화에 따라 UI가 자연스럽게 변경되는 구조를 설계했습니다.',
                image: 'image/web2.jpg',
                tags: [
                    ['인증 방식', 'Email & Password 기반 사용자 인증'],
                    ['비동기 처리', 'FirebaseAuth 비동기 API 활용'],
                    ['상태 관리', 'StateChanged 이벤트 기반 로그인 상태 감지'],
                    ['UI 연동', '로그인 상태에 따른 UI 자동 전환']
                ]
            },
            {
                title: '캐릭터 조작 및 이동 시스템',
                subtitle: 'FSM 기반 상태 제어와 NavMesh 연동을 통한 Top-Down 캐릭터 이동 시스템 구현',
                description: 'Top-Down 3D 시점에서 플레이어가 마우스 입력만으로 자연스럽게 이동 및 상호작용할 수 있는 조작 시스템을 구현했습니다.',
                image: 'image/web2.jpg',
                tags: [
                    ['입력 처리', '마우스 클릭 기반 목적지 설정'],
                    ['이동 제어', 'NavMeshAgent를 활용한 경로 이동'],
                    ['상태 전환', '이동 / 정지 / 공격 상태 분리']
                ]
            },
            {
                title: '아이템 및 인벤토리 시스템',
                subtitle: 'Scriptable Object 기반 아이템 데이터와 장착/해제 흐름 구현',
                description: '아이템 데이터를 코드와 분리하고 인벤토리 UI, 장착 슬롯, 캐릭터 능력치 반영 흐름을 연결했습니다.',
                image: 'image/web2.jpg',
                tags: [
                    ['데이터 구조', 'Scriptable Object 기반 아이템 정의'],
                    ['UI 연동', '슬롯 클릭과 상세 정보 표시'],
                    ['장착 처리', '장비 장착 / 해제 상태 반영']
                ]
            }
        ]
    },
    SecondTeam: {
        title: 'SYMBIO Project',
        subtitle: 'Unreal FPS 팀 프로젝트 / 4인',
        description: '그리드에 블록을 배치하고 점수를 획득하는 캐주얼 퍼즐 게임입니다.',
        image: 'image/web2.jpg',
        github: 'https://github.com/GyungSikHan/1st-Team14-CH3-Project',
        youtube: 'https://youtu.be/tJcozATuAgQ?si=a0gReyRljIx07e7P',
        project: 'https://drive.google.com/file/d/1wuGg5KNYLVXD0ZXs_h4th62TAfnBNP6L/view',
        features: [
            '그리드 기반 블록 배치 판정',
            '블록 모양 데이터 관리',
            '점수 및 최고 점수 저장',
            '색상 제거 보너스 시스템'
        ],
        details: [
            {
                title: '그리드 기반 블록 배치 시스템',
                subtitle: '블록 모양 데이터와 보드 상태를 기반으로 한 배치 가능 여부 판정',
                description: '현재 블록이 그리드에 들어갈 수 있는지 검사하고 배치 후 보드 상태와 점수를 갱신합니다.',
                image: 'image/web2.jpg',
                tags: [
                    ['배치 판정', '블록 셀과 그리드 점유 상태 비교'],
                    ['데이터 관리', 'ShapeData 기반 블록 모양 분리'],
                    ['게임 흐름', '배치 후 점수와 다음 블록 갱신']
                ]
            },
            {
                title: '점수 보너스 시스템',
                subtitle: '색상 블록 클리어 조건을 활용한 보너스 점수와 UI 피드백',
                description: '색상별 블록 제거 조건을 체크하고 보너스 발생 시 점수와 시각적 피드백을 제공합니다.',
                image: 'image/web2.jpg',
                tags: [
                    ['조건 판별', '동일 색상 블록 제거 여부 확인'],
                    ['점수 계산', '조건 충족 시 보너스 점수 추가'],
                    ['UI 피드백', '보너스 발생 메시지 표시']
                ]
            }
        ]
    },
    FirstTeam: {
        title: 'Text RPG',
        subtitle: 'C++ 팀 프로젝트 / 4인',
        description: '팀으로 진행한 3D 액션 게임 모작 프로젝트입니다. 맵툴, 기믹, 네비게이션, 최적화 파트를 중심으로 기여했습니다.',
        image: 'image/web2.jpg',
        github: 'https://github.com/GyungSikHan/Let_sDoItFirst',
        youtube: 'https://youtu.be/QqcPvBTLAaA?si=Q8kETZwgl9uYdcV0',
        project: 'https://drive.google.com/file/d/1T6DfcRIsckD-XOfbujmkS645I34GVanF/view?usp=sharing',
        features: [
            '맵툴 및 레벨 배치 기능',
            '기믹 오브젝트 상호작용',
            '네비게이션 매쉬 구성',
            '픽셀 피킹 기반 선택 처리'
        ],
        details: [
            {
                title: '맵툴 및 레벨 배치 기능',
                subtitle: '팀 프로젝트의 레벨 제작 속도를 높이기 위한 편집 도구 구현',
                description: '레벨 오브젝트 배치와 수정 작업을 빠르게 할 수 있는 도구를 구성하고 팀원이 사용할 수 있도록 흐름을 정리했습니다.',
                image: 'image/web2.jpg',
                tags: [
                    ['맵툴', '오브젝트 배치 / 수정 / 삭제'],
                    ['협업', '공통 데이터 구조에 맞춘 결과 저장'],
                    ['디버깅', '실행 중 오브젝트 상태 확인']
                ]
            },
            {
                title: '기믹 오브젝트 구현',
                subtitle: '상호작용 가능한 레벨 오브젝트와 게임 진행 조건 연결',
                description: '플레이어 입력과 충돌 상태에 따라 문, 장치, 이벤트 오브젝트가 동작하도록 구성했습니다.',
                image: 'image/web2.jpg',
                tags: [
                    ['상호작용', '플레이어 입력과 충돌 조건 처리'],
                    ['레벨 흐름', '진행 조건과 오브젝트 상태 연동'],
                    ['확장성', '기믹 타입 추가 가능 구조']
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
        const tagsHtml = detail.tags.map(tag => `
            <p class="feature-line">
                <span class="feature-title">${tag[0]}</span>
                <span class="feature-desc">${tag[1]}</span>
            </p>
        `).join('');

        return `
        <div class="modal-feature-section">
            <h3>${index + 1}. ${detail.title}</h3>
            <h4>${detail.subtitle}</h4>
            <p>${detail.description}</p>
            <div class="modal-feature-row ${index % 2 === 0 ? 'reverse' : ''}">
                <div class="text-content">
                    <div class="modal-tabs">
                        <span class="modal-tab active">해결 방법</span>
                        <span class="modal-tab">구현 상세</span>
                    </div>
                    ${tagsHtml}
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
