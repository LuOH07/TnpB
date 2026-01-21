// 导航栏滚动效果
window.addEventListener('scroll', function() {
    // 如果当前页面是description或design页面，则不执行滚动效果
    if (document.body.classList.contains('description-page') || 
        document.body.classList.contains('design-page')) {
        return;
    }

    const header = document.querySelector('.header');
    const logoText = document.querySelector('.logo-text');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn i');
    
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
        // 滚动后改变移动菜单按钮颜色
        if (mobileMenuBtn) {
            mobileMenuBtn.style.color = '#1a5fb4';
        }
    } else {
        header.classList.remove('scrolled');
        // 滚动前恢复移动菜单按钮颜色
        if (mobileMenuBtn) {
            mobileMenuBtn.style.color = 'white';
        }
    }
});

// 移动端菜单切换
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const navMenu = document.getElementById('nav-menu');

mobileMenuBtn.addEventListener('click', function() {
    navMenu.classList.toggle('active');
    mobileMenuBtn.querySelector('i').classList.toggle('fa-bars');
    mobileMenuBtn.querySelector('i').classList.toggle('fa-times');
    
    // 切换菜单按钮颜色
    const icon = mobileMenuBtn.querySelector('i');
    if (navMenu.classList.contains('active')) {
        icon.style.color = '#1a5fb4';
    } else {
        if (window.scrollY > 50) {
            icon.style.color = '#1a5fb4';
        } else {
            icon.style.color = 'white';
        }
    }
});

// 移动端下拉菜单切换
const navItems = document.querySelectorAll('.nav-item');

navItems.forEach(item => {
    if (item.querySelector('.dropdown-menu')) {
        const link = item.querySelector('.nav-link');
        
        link.addEventListener('click', function(e) {
            if (window.innerWidth <= 992) {
                e.preventDefault();
                e.stopPropagation();
                
                // 切换当前下拉菜单
                const dropdown = item.querySelector('.dropdown-menu');
                dropdown.classList.toggle('active');
                
                // 旋转箭头图标
                const arrow = link.querySelector('.dropdown-arrow');
                if (arrow) {
                    arrow.classList.toggle('rotated');
                }
                
                // 关闭其他打开的下拉菜单
                navItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        const otherDropdown = otherItem.querySelector('.dropdown-menu');
                        if (otherDropdown && otherDropdown.classList.contains('active')) {
                            otherDropdown.classList.remove('active');
                            const otherArrow = otherItem.querySelector('.dropdown-arrow');
                            if (otherArrow) {
                                otherArrow.classList.remove('rotated');
                            }
                        }
                    }
                });
            }
        });
    }
});

// 点击页面其他地方关闭移动菜单和下拉菜单
document.addEventListener('click', function(e) {
    if (window.innerWidth <= 992) {
        // 如果点击的不是导航容器
        if (!e.target.closest('.nav-container')) {
            navMenu.classList.remove('active');
            const mobileMenuIcon = mobileMenuBtn.querySelector('i');
            mobileMenuIcon.classList.remove('fa-times');
            mobileMenuIcon.classList.add('fa-bars');
            
            // 恢复移动菜单按钮颜色
            if (window.scrollY > 50) {
                mobileMenuIcon.style.color = '#1a5fb4';
            } else {
                mobileMenuIcon.style.color = 'white';
            }
            
            // 关闭所有下拉菜单
            document.querySelectorAll('.dropdown-menu').forEach(dropdown => {
                dropdown.classList.remove('active');
            });
            
            // 重置所有箭头
            document.querySelectorAll('.dropdown-arrow').forEach(arrow => {
                arrow.classList.remove('rotated');
            });
        }
    }
});

// 回到顶部功能
const toggleBtn = document.querySelector('.toggle');
if (toggleBtn) {
    toggleBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// 页面加载时检查滚动位置
window.addEventListener('load', function() {
    // 如果是description或design页面，设置页眉为滚动状态
    if (document.body.classList.contains('description-page') || 
        document.body.classList.contains('design-page')) {
        const header = document.querySelector('.header');
        if (header) {
            header.classList.add('scrolled');
        }
        // 设置移动菜单按钮颜色
        const mobileMenuIcon = document.querySelector('.mobile-menu-btn i');
        if (mobileMenuIcon) {
            mobileMenuIcon.style.color = '#1a5fb4';
        }
    } else if (window.scrollY > 50) {
        document.querySelector('.header').classList.add('scrolled');
        // 设置移动菜单按钮颜色
        const mobileMenuIcon = document.querySelector('.mobile-menu-btn i');
        if (mobileMenuIcon) {
            mobileMenuIcon.style.color = '#1a5fb4';
        }
    }
});

// 平滑滚动到锚点
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        // 如果不是锚点链接或链接是#，则不处理
        if (href === '#' || !href.startsWith('#')) return;
        
        // 如果是移动端菜单，先关闭菜单
        if (window.innerWidth <= 992) {
            navMenu.classList.remove('active');
            const mobileMenuIcon = mobileMenuBtn.querySelector('i');
            mobileMenuIcon.classList.remove('fa-times');
            mobileMenuIcon.classList.add('fa-bars');
            
            // 恢复移动菜单按钮颜色
            if (window.scrollY > 50) {
                mobileMenuIcon.style.color = '#1a5fb4';
            } else {
                mobileMenuIcon.style.color = 'white';
            }
            
            // 关闭所有下拉菜单
            document.querySelectorAll('.dropdown-menu').forEach(dropdown => {
                dropdown.classList.remove('active');
            });
            
            // 重置所有箭头
            document.querySelectorAll('.dropdown-arrow').forEach(arrow => {
                arrow.classList.remove('rotated');
            });
        }
        
        e.preventDefault();
        
        const targetElement = document.querySelector(href);
        if (targetElement) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// 添加旋转箭头的CSS样式
document.addEventListener('DOMContentLoaded', function() {
    const style = document.createElement('style');
    style.textContent = `
        .dropdown-arrow.rotated {
            transform: rotate(180deg) !important;
        }
        
        @media (max-width: 992px) {
            .dropdown-arrow.rotated {
                transform: rotate(180deg) !important;
            }
        }
    `;
    document.head.appendChild(style);
});

// 桌面端悬停下拉菜单
document.addEventListener('DOMContentLoaded', function() {
    const dropdownItems = document.querySelectorAll('.dropdown-item');
    
    dropdownItems.forEach(item => {
        // 桌面端悬停显示下拉菜单
        if (window.innerWidth > 992) {
            item.addEventListener('mouseenter', function() {
                const dropdown = this.querySelector('.dropdown-menu');
                if (dropdown) {
                    dropdown.style.opacity = '1';
                    dropdown.style.visibility = 'visible';
                    dropdown.style.transform = 'translateY(0)';
                }
            });
            
            item.addEventListener('mouseleave', function() {
                const dropdown = this.querySelector('.dropdown-menu');
                if (dropdown) {
                    dropdown.style.opacity = '0';
                    dropdown.style.visibility = 'hidden';
                    dropdown.style.transform = 'translateY(10px)';
                }
            });
        }
    });
});