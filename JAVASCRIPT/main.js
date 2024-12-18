// DOM이 완전히 로드된 후 실행
document.addEventListener("DOMContentLoaded", () => {
  // GSAP ScrollTrigger 플러그인 등록
  gsap.registerPlugin(ScrollTrigger);

  // 헤더 스크롤 애니메이션 설정
  let lastScroll = 0;
  const header = document.querySelector(".header");

  // 스크롤 이벤트 리스너: 스크롤 방향에 따라 헤더 표시/숨김
  window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset;

    // 아래로 스크롤 시 헤더 숨김
    if (currentScroll > lastScroll) {
      header.style.transform = `translateY(-${header.offsetHeight}px)`;
    }
    // 위로 스크롤 시 헤더 표시
    else {
      header.style.transform = "translateY(0)";
    }

    lastScroll = currentScroll;
  });

  // 인트로 섹션 스크롤 애니메이션
  gsap.from(".intro__content", {
    scrollTrigger: {
      trigger: ".intro",
      start: "top center",
      end: "bottom center",
      toggleActions: "play none none reverse",
    },
    y: 100, // 시작 위치 (Y축)
    opacity: 0, // 시작 투명도
    duration: 1, // 애니메이션 지속 시간
    ease: "power2.out", // 이징 함수
  });

  // 예배 시간 섹션 스크롤 애니메이션
  gsap.from(".schedule__item", {
    scrollTrigger: {
      trigger: ".worship",
      start: "top center",
      end: "bottom center",
      toggleActions: "play none none reverse",
    },
    y: 50,
    opacity: 0,
    duration: 0.8,
    stagger: 0.2,
    ease: "power2.out",
  });

  // 공지사항 섹션 애니메이션
  gsap.from(".notice__item", {
    scrollTrigger: {
      trigger: ".notice",
      start: "top center",
      end: "bottom center",
      toggleActions: "play none none reverse",
    },
    x: -50,
    opacity: 0,
    duration: 0.8,
    stagger: 0.2,
    ease: "power2.out",
  });

  // 위치 섹션 애니메이션
  gsap.from(".location__map", {
    scrollTrigger: {
      trigger: ".location",
      start: "top center",
      end: "bottom center",
      toggleActions: "play none none reverse",
    },
    x: 50,
    opacity: 0,
    duration: 0.8,
    ease: "power2.out",
  });

  gsap.from(".details__item", {
    scrollTrigger: {
      trigger: ".location",
      start: "top center",
      end: "bottom center",
      toggleActions: "play none none reverse",
    },
    x: -50,
    opacity: 0,
    duration: 0.8,
    stagger: 0.2,
    ease: "power2.out",
  });

  // 활동 섹션 애니메이션
  gsap.from(".activity__item", {
    scrollTrigger: {
      trigger: ".activities",
      start: "top center",
      end: "bottom center",
      toggleActions: "play none none reverse",
    },
    y: 50, // 시작 위치 (Y축)
    opacity: 0, // 시작 투명도
    duration: 0.8, // 애니메이션 지속 시간
    stagger: 0.2, // 각 아이템 간 딜레이
    ease: "power2.out", // 이징 함수
  });

  // Google Maps 초기화 함수
  function initMap() {
    // 교회 위치 좌표 설정
    const churchLocation = { lat: 36.67212, lng: 126.655562 }; // 예산군 삽교읍 좌표

    // 구글 맵 인스턴스 생성
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 15,
      center: churchLocation,
      // 맵 스타일 커스터마이징
      styles: [
        {
          featureType: "all",
          elementType: "geometry",
          stylers: [{ saturation: "0" }, { lightness: "0" }],
        },
      ],
    });

    // 교회 위치 마커 생성
    const marker = new google.maps.Marker({
      position: churchLocation,
      map: map,
      title: "우리 교회",
    });
  }

  // Google Maps API 스크립트 동적 로드
  if (typeof google === "undefined") {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_MAPS_API_KEY&callback=initMap`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
    window.initMap = initMap;
  } else {
    initMap();
  }

  // 모바일 메뉴 토글 기능
  const createMobileMenu = () => {
    const header = document.querySelector('.header');
    const nav = document.querySelector('.header__nav');
    
    // 모바일 메뉴 버튼 생성
    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.className = 'mobile-menu-btn';
    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    
    // 모바일 화면에서만 버튼 표시
    const showMenuButton = () => {
      if (window.innerWidth <= 768) {
        if (!header.contains(mobileMenuBtn)) {
          header.appendChild(mobileMenuBtn);
        }
      } else {
        if (header.contains(mobileMenuBtn)) {
          header.removeChild(mobileMenuBtn);
        }
        nav.classList.remove('active');
      }
    };
    
    // 초기 실행 및 리사이즈 이벤트에 연결
    showMenuButton();
    window.addEventListener('resize', showMenuButton);
    
    // 메뉴 토글 기능
    mobileMenuBtn.addEventListener('click', () => {
      nav.classList.toggle('active');
      mobileMenuBtn.innerHTML = nav.classList.contains('active') 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
    });
  };
  
  createMobileMenu();

  // 네비게이션 링크 클릭 이벤트 방지
  const navLinks = document.querySelectorAll('.nav__list a');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault(); // 기본 링크 동작 방지
    });
  });
});
