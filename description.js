// Description页面专用JavaScript - 简化版

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
        const sections = document.querySelectorAll('.document-body section');
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
    
    // 移动端侧边栏优化
    const setupMobileSidebar = () => {
        if (window.innerWidth <= 992) {
            const sidebar = document.querySelector('.sidebar-nav');
            const sidebarHeader = document.querySelector('.sidebar-header');
            
            // 添加移动端折叠功能
            if (sidebarHeader) {
                sidebarHeader.style.cursor = 'pointer';
                sidebarHeader.addEventListener('click', function() {
                    sidebar.classList.toggle('collapsed');
                });
            }
        }
    };
    
    setupMobileSidebar();
    window.addEventListener('resize', setupMobileSidebar);
});