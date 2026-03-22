// loadData 加载 JSON 数据并渲染页面
// 参数: 无
// 返回: 无
// 说明: 异步获取 info.json，解析数据并填充至各 DOM 节点
document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('./info.json');
        if (!response.ok) {
            throw new Error('无法加载数据文件 info.json');
        }
        const data = await response.json();
        const profile = data.profile;

        renderHeader(profile);
        renderSkills(profile.technicalSkills, profile.knowledgeBase);
        renderProjects(profile.currentProjects);
        renderArt(profile.artisticCreation);
        renderFriends(profile.friendLinks);
    } catch (error) {
        console.error('加载个人信息出错:', error);
        document.getElementById('bio').innerText = '数据加载失败，请检查文件路径或使用本地服务器运行。';
    }
});

// renderHeader 渲染头部个人信息
// 参数: profile - JSON中的 profile 对象
// 返回: 无
// 说明: 填充头像、名字、英文名、基础信息标签和简介
function renderHeader(profile) {
    document.getElementById('avatar').src = `./${profile.picture}`;
    document.getElementById('name').innerText = profile.handleAndPenName;
    document.getElementById('english-name').innerText = profile.englishName;
    document.getElementById('basic-info').innerHTML = `<i class="fas fa-info-circle"></i> ${profile.basicInfo}`;
    document.getElementById('bio').innerText = profile.bio;
    document.getElementById('footer-name').innerText = profile.handleAndPenName;
}

// renderSkills 渲染技能与知识库
// 参数: skills - JSON中的 technicalSkills 对象, knowledge - JSON中的 knowledgeBase 字符串
// 返回: 无
// 说明: 渲染核心语言、熟悉语言、技术栈，以及理论储备文本
function renderSkills(skills, knowledge) {
    document.getElementById('knowledge').innerText = knowledge;

    const primaryContainer = document.getElementById('primary-lang');
    skills.primaryLanguages.forEach(lang => {
        const span = document.createElement('span');
        span.className = 'skill-tag lang-primary';
        span.innerText = lang;
        primaryContainer.appendChild(span);
    });

    const familiarContainer = document.getElementById('familiar-lang');
    skills.familiarLanguages.forEach(lang => {
        const span = document.createElement('span');
        span.className = 'skill-tag lang-familiar';
        span.innerText = lang;
        familiarContainer.appendChild(span);
    });

    const techStackContainer = document.getElementById('tech-stack');
    const allStacks = [
        ...skills.techStack.aiAndData, 
        ...skills.techStack.backendAndServices, 
        ...skills.techStack.storageAndRetrieval
    ];
    allStacks.forEach(tech => {
        const span = document.createElement('span');
        span.className = 'skill-tag tech-stack';
        span.innerText = tech;
        techStackContainer.appendChild(span);
    });
}

// renderProjects 渲染当前项目
// 参数: projects - JSON中的 currentProjects 对象
// 返回: 无
// 说明: 遍历对象属性，区分开发中项目和待办项目进行卡片渲染
function renderProjects(projects) {
    const container = document.getElementById('projects-container');
    
    // 渲染 featureRichCrawlerLibrary
    if (projects.featureRichCrawlerLibrary) {
        const p = projects.featureRichCrawlerLibrary;
        const card = document.createElement('div');
        card.className = 'project-card';
        card.innerHTML = `
            <h4>🕷️ 功能丰富的爬虫库</h4>
            <p>状态: <strong>${p.status}</strong></p>
            <div>
                ${p.features ? p.features.map(f => `<span class="project-feature">${f}</span>`).join('') : ''}
            </div>
        `;
        container.appendChild(card);
    }

    // 渲染 backendWebsite
    if (projects.backendWebsite) {
        const p = projects.backendWebsite;
        const card = document.createElement('div');
        card.className = 'project-card';
        card.innerHTML = `
            <h4>🌐 后端服务网站</h4>
            <p>状态: <strong>${p.status}</strong></p>
        `;
        container.appendChild(card);
    }

    // 渲染 todoList
    if (projects.todoList && projects.todoList.length > 0) {
        projects.todoList.forEach(todo => {
            const card = document.createElement('div');
            card.className = 'project-card todo';
            card.innerHTML = `
                <h4>☁️ 待办计划</h4>
                <p>${todo}</p>
            `;
            container.appendChild(card);
        });
    }
}

// renderArt 渲染艺术创作
// 参数: art - JSON中的 artisticCreation 对象
// 返回: 无
// 说明: 渲染诗词喜好与小说世界观列表
function renderArt(art) {
    document.getElementById('poetry').innerText = art.poetry;
    document.getElementById('fiction-desc').innerText = art.fiction.description;
    
    const list = document.getElementById('worldviews');
    art.fiction.worldviews.forEach(wv => {
        const li = document.createElement('li');
        li.innerText = wv;
        list.appendChild(li);
    });
}

// renderFriends 渲染友情链接
// 参数: friends - JSON中的 friendLinks 数组
// 返回: 无
// 说明: 渲染好友头像、名字、描述并提供跳转链接
function renderFriends(friends) {
    const container = document.getElementById('friends-container');
    friends.forEach(friend => {
        const a = document.createElement('a');
        a.href = friend.url;
        a.target = "_blank";
        a.className = "friend-card";
        
        a.innerHTML = `
            <img class="friend-avatar" src="./${friend.picture}" alt="${friend.name}头像">
            <div class="friend-info">
                <h4>${friend.name}</h4>
                <p>${friend.description}</p>
            </div>
        `;
        container.appendChild(a);
    });
}