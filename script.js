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
    directx: {
        title: 'DirectX 3D Action',
        subtitle: 'DirectX11 개인 프로젝트',
        description: 'DirectX11 기반 자체 엔진으로 구현한 3D 액션 포트폴리오입니다. 게임 클라이언트 개발 전반의 이해를 목표로 구성했습니다.',
        summary: 'DirectX<br>Action',
        features: [
            'DirectX11 기반 렌더링 파이프라인 구성',
            '캐릭터 이동, 공격, 피격 상태 구현',
            'ImGui 기반 맵툴 제작',
            'Instancing 및 Frustum Culling 최적화'
        ],
        details: [
            ['캐릭터 핵심 조작 및 전투 로직', '이동, 점프, 공격 상태를 연결하고 충돌 판정을 통해 전투 피드백을 구성했습니다.'],
            ['맵툴 제작', '실행 중 오브젝트 위치, 회전, 스케일을 수정할 수 있는 편집 도구를 만들었습니다.'],
            ['렌더링 최적화', '보이지 않는 오브젝트를 제외하고 반복 렌더링 비용을 줄이는 구조를 적용했습니다.']
        ]
    },
    unity: {
        title: 'Unity RPG',
        subtitle: 'Unity 개인 프로젝트',
        description: 'Unity 기반 Top-Down RPG 프로젝트입니다. 전투, 아이템, NPC, 퀘스트 흐름을 하나의 플레이 루프로 구성했습니다.',
        summary: 'Unity<br>RPG',
        features: [
            '탑다운 3D 컨트롤 구현',
            'AI 및 전투 시스템 구성',
            '아이템과 인벤토리 데이터 관리',
            'NPC 대화 및 퀘스트 진행 구현'
        ],
        details: [
            ['전투 시스템', '플레이어 입력, 공격 범위, 적 AI 반응을 연결해 기본 전투 흐름을 만들었습니다.'],
            ['인벤토리 시스템', '아이템 데이터와 UI 표시를 분리하여 확장 가능한 구조로 구성했습니다.'],
            ['퀘스트 시스템', 'NPC 상호작용과 진행 상태를 관리해 플레이 목표를 전달했습니다.']
        ]
    },
    puzzle: {
        title: 'Puzzle Blocks',
        subtitle: 'Unity 캐주얼 프로젝트',
        description: '그리드에 블록을 배치하고 점수를 획득하는 캐주얼 퍼즐 게임입니다.',
        summary: 'Puzzle<br>Blocks',
        features: [
            '그리드 기반 블록 배치 판정',
            '블록 모양 데이터 관리',
            '점수 및 최고 점수 저장',
            '색상 제거 보너스 시스템'
        ],
        details: [
            ['블록 배치 시스템', '현재 블록이 그리드에 들어갈 수 있는지 검사하고 배치 후 상태를 갱신합니다.'],
            ['점수 시스템', '라인 제거와 색상 조건에 따라 점수를 계산하고 UI 피드백을 제공합니다.'],
            ['데이터 저장', '최고 점수를 저장해 재실행 후에도 기록이 유지되도록 구성했습니다.']
        ]
    },
    team: {
        title: 'Team Action Game',
        subtitle: 'DirectX11 팀 프로젝트',
        description: '팀으로 진행한 3D 액션 게임 모작 프로젝트입니다. 맵툴, 기믹, 네비게이션, 최적화 파트를 중심으로 기여했습니다.',
        summary: 'Team<br>Project',
        features: [
            '맵툴 및 레벨 배치 기능',
            '기믹 오브젝트 상호작용',
            '네비게이션 매쉬 구성',
            '픽셀 피킹 기반 선택 처리'
        ],
        details: [
            ['맵툴', '레벨 오브젝트 배치와 수정 작업을 빠르게 할 수 있는 도구를 구성했습니다.'],
            ['기믹 오브젝트', '상호작용 가능한 오브젝트와 게임 진행 조건을 연결했습니다.'],
            ['팀 협업', '파트별 책임을 나누고 공통 엔진 구조에 맞춰 기능을 통합했습니다.']
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
    const detailsHtml = project.details.map(detail => `
        <div class="modal-feature-section">
            <h3>${detail[0]}</h3>
            <h4>구현 요약</h4>
            <p>${detail[1]}</p>
        </div>
    `).join('');

    content.innerHTML = `
        <div class="new-modal-layout">
            <div class="project-left-column">
                <div class="modal-summary-box">${project.summary}</div>
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
