// Description页面专用JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // 侧边栏导航平滑滚动
    const sidebarLinks = document.querySelectorAll('.sidebar-nav a');
    
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // 移除所有活动类
                sidebarLinks.forEach(l => l.classList.remove('active'));
                // 添加当前活动类
                this.classList.add('active');
                
                // 计算滚动位置
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
                
                // 平滑滚动
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // 滚动时更新活动导航项
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('.content-section');
        const scrollPosition = window.scrollY + 100;
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = '#' + section.getAttribute('id');
            }
        });
        
        // 更新侧边栏活动状态
        sidebarLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === currentSection) {
                link.classList.add('active');
            }
        });
    });
    
    // 回到顶部按钮
    const toggleBtn = document.querySelector('.toggle');
    if (toggleBtn) {
        toggleBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // 初始化第一个活动导航项
    if (sidebarLinks.length > 0) {
        sidebarLinks[0].classList.add('active');
    }
    
    // 为统计数字添加动画效果
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const animateNumbers = () => {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.textContent.replace(/[^0-9]/g, ''));
            const suffix = stat.textContent.replace(/[0-9]/g, '');
            
            let current = 0;
            const increment = target / 50;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                stat.textContent = Math.floor(current) + suffix;
            }, 30);
        });
    };
    
    // 当统计数字进入视口时触发动画
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateNumbers();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    // 观察第一个统计数字，触发所有动画
    if (statNumbers.length > 0) {
        observer.observe(statNumbers[0].parentElement);
    }
    
    // 为时间线元素添加动画
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const animateTimeline = () => {
        timelineItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
            }, index * 200);
        });
    };
    
    // 初始化时间线样式
    timelineItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        item.style.transition = 'opacity 0.5s, transform 0.5s';
    });
    
    // 当时间线进入视口时触发动画
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateTimeline();
                timelineObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    // 观察时间线容器
    const timelineContainer = document.querySelector('.timeline');
    if (timelineContainer) {
        timelineObserver.observe(timelineContainer);
    }
    
    // 为创新网格项目添加悬停效果
    const innovationItems = document.querySelectorAll('.innovation-item');
    
    innovationItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.1)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.05)';
        });
    });
    
    // 移动端侧边栏优化
    const setupMobileSidebar = () => {
        if (window.innerWidth <= 992) {
            const sidebar = document.querySelector('.sidebar-nav');
            const sidebarHeader = document.querySelector('.sidebar-header');
            
            // 添加移动端折叠功能
            sidebarHeader.style.cursor = 'pointer';
            sidebarHeader.addEventListener('click', function() {
                sidebar.classList.toggle('collapsed');
            });
        }
    };
    
    setupMobileSidebar();
    window.addEventListener('resize', setupMobileSidebar);
    
    // 打印功能（可选）
    const addPrintButton = () => {
        const pageHeader = document.querySelector('.page-header');
        if (pageHeader) {
            const printBtn = document.createElement('button');
            printBtn.innerHTML = '<i class="fas fa-print"></i> Print Page';
            printBtn.className = 'print-button';
            printBtn.style.cssText = `
                position: absolute;
                right: 20px;
                top: 20px;
                background: linear-gradient(135deg, #1a5fb4 0%, #2d8ae5 100%);
                color: white;
                border: none;
                padding: 10px 20px;
                border-radius: 5px;
                cursor: pointer;
                font-size: 0.9rem;
                transition: all 0.3s;
            `;
            
            printBtn.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-2px)';
                this.style.boxShadow = '0 5px 15px rgba(26, 95, 180, 0.3)';
            });
            
            printBtn.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = 'none';
            });
            
            printBtn.addEventListener('click', function() {
                window.print();
            });
            
            pageHeader.style.position = 'relative';
            pageHeader.appendChild(printBtn);
        }
    };
    
    // 可选：启用打印功能
    // addPrintButton();
});