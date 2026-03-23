// initData 初始化画师数据
// 参数:无
// 返回:无
// 说明:使用内嵌的数据，并将其绑定到DOM节点上
function initData() {
    try {
        const data = {
          "profile": {
            "basic_info": {
              "homepage_name": "第47日份麦芽唐",
              "alias": "麦芽唐",
              "identity": "在校上学的学生W，努力积攒绘画经验的小画师",
              "main_products": ["盘泪", "稿件"]
            },
            "notice": "未经允许，严禁抄袭、搬运、转载一切个人创作作品和二创同人作品。",
            "platforms": {
              "米画师": "第47日份麦芽唐",
              "画加": "第47日份麦芽唐"
            },
            "details": "约稿部分嘛，只接furry/兽兽的相关稿单。画风可以参考下有兽的画感哦,接单时间不固定（群内实时更新），接稿主要在QQ群，平台（id均为第47日份麦芽唐）偶尔会放橱窗，欢迎来戳和pp哦",
            "community": "欢迎来戳和pp哦,群里偶尔还抽无偿小福利w,欢迎一起来围观一个画师的成长史，感兴趣的老师们欢迎进群一起聊天w",
            "abstract": "大家好～这里是第47日份麦芽唐\n目前是在校上学的学生W，还是个努力积攒绘画经验的小画师，感谢各位老师／大人的信任，也承蒙各位大人赏眼赏单()～"
          },
          "pictures": []
        };
        
        renderProfile(data.profile);
        renderPictures(data.pictures);
        
    } catch (error) {
        console.error('加载数据失败:', error);
        document.getElementById('abstract').textContent = '数据加载失败...';
    }
}

// renderProfile 渲染画师基本信息
// 参数:profile - 从json中解析出的profile对象
// 返回:无
// 说明:分别渲染基础信息、通知、约稿说明、平台、社群等
function renderProfile(profile) {
    if (!profile) return;

    const basic = profile.basic_info || {};
    
    // 渲染基础文本
    document.getElementById('homepage-name').textContent = basic.homepage_name || '未知画师';
    document.getElementById('footer-name').textContent = basic.homepage_name || '未知画师';
    document.getElementById('alias').textContent = `@${basic.alias || '未知'}`;
    document.getElementById('identity').textContent = basic.identity || '';
    document.getElementById('abstract').textContent = profile.abstract || '';
    document.getElementById('notice').textContent = profile.notice || '';
    document.getElementById('details').textContent = profile.details || '';
    document.getElementById('community').textContent = profile.community || '';

    // 渲染主要接稿类型
    const productsContainer = document.getElementById('main-products');
    if (basic.main_products && basic.main_products.length > 0) {
        productsContainer.innerHTML = '';
        basic.main_products.forEach(product => {
            const span = document.createElement('span');
            span.className = 'product-badge';
            span.textContent = product;
            productsContainer.appendChild(span);
        });
    }

    // 渲染平台信息
    const platformsContainer = document.getElementById('platforms');
    if (profile.platforms) {
        platformsContainer.innerHTML = '';
        for (const [platform, id] of Object.entries(profile.platforms)) {
            const div = document.createElement('div');
            div.className = 'platform-item';
            div.innerHTML = `
                <span class="platform-name">${platform}</span>
                <span class="platform-id">ID: ${id}</span>
            `;
            platformsContainer.appendChild(div);
        }
    }
    
    // 更新年份
    document.getElementById('year').textContent = new Date().getFullYear();
}

// renderPictures 渲染画师作品
// 参数:pictures - 图片数组
// 返回:无
// 说明:如果有图片则循环渲染，无图片则保留默认的空状态提示
function renderPictures(pictures) {
    const gallery = document.getElementById('gallery');
    
    if (pictures && pictures.length > 0) {
        gallery.innerHTML = ''; // 清空空提示
        pictures.forEach(pic => {
            const imgDiv = document.createElement('div');
            imgDiv.className = 'gallery-item';
            // 假设图片对象中有 url 属性
            imgDiv.innerHTML = `<img src="${pic.url}" alt="作品" style="width:100%; border-radius: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">`;
            gallery.appendChild(imgDiv);
        });
    }
}

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', initData);