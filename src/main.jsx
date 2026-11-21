import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const navigation = [
  { id: 'overview', label: 'Обзор', icon: 'overview' },
  { id: 'projects', label: 'Объекты', icon: 'house', count: '3' },
  { id: 'clients', label: 'Клиенты', icon: 'users' },
  { id: 'tasks', label: 'Задачи', icon: 'tasks', count: '8' },
  { id: 'purchases', label: 'Закупки', icon: 'box' },
  { id: 'finances', label: 'Финансы', icon: 'wallet' },
  { id: 'documents', label: 'Документы', icon: 'file' },
];

const projects = [
  {
    id: 1,
    name: 'Дом для семьи Соколовых',
    address: 'КП «Сосновый берег», участок 18',
    client: 'Александр Соколов',
    initials: 'АС',
    stage: 'Возведение стен',
    stageIndex: 2,
    progress: 68,
    deadline: '24 окт 2026',
    budget: '8 450 000 ₽',
    spent: '5 390 000 ₽',
    tone: 'sand',
    code: 'Д-026',
  },
  {
    id: 2,
    name: 'Дом для Анны и Михаила',
    address: 'д. Куюки, ул. Центральная, 14',
    client: 'Анна и Михаил Петровы',
    initials: 'АП',
    stage: 'Фундамент',
    stageIndex: 1,
    progress: 24,
    deadline: '12 дек 2026',
    budget: '6 200 000 ₽',
    spent: '1 120 000 ₽',
    tone: 'blue',
    code: 'Д-027',
  },
  {
    id: 3,
    name: 'Загородный дом · проект 03',
    address: 'КП «Лесная поляна», участок 7',
    client: 'Ирина Павлова',
    initials: 'ИП',
    stage: 'Внутренняя отделка',
    stageIndex: 5,
    progress: 86,
    deadline: '5 сен 2026',
    budget: '9 100 000 ₽',
    spent: '7 820 000 ₽',
    tone: 'green',
    code: 'Д-025',
  },
];

const tasks = [
  { id: 1, title: 'Залить плиту перекрытия', project: projects[0].name, date: 'Сегодня', owner: 'МК', status: 'В работе', tone: 'green' },
  { id: 2, title: 'Согласовать окна с заказчиком', project: projects[1].name, date: 'Сегодня', owner: 'АС', status: 'Ожидает', tone: 'amber' },
  { id: 3, title: 'Доставить утеплитель на объект', project: projects[2].name, date: 'Завтра', owner: 'ДЛ', status: 'Запланировано', tone: 'blue' },
  { id: 4, title: 'Проверить гидроизоляцию фундамента', project: projects[1].name, date: '25 ноя', owner: 'ИВ', status: 'Запланировано', tone: 'blue' },
];

const clients = [
  { name: 'Александр Соколов', initials: 'АС', phone: '+7 917 240-18-42', email: 'sokolov@example.ru', project: projects[0].name, status: 'Активный проект' },
  { name: 'Анна и Михаил Петровы', initials: 'АП', phone: '+7 987 514-09-33', email: 'petrova@example.ru', project: projects[1].name, status: 'Активный проект' },
  { name: 'Ирина Павлова', initials: 'ИП', phone: '+7 905 663-28-17', email: 'pavlova@example.ru', project: projects[2].name, status: 'Активный проект' },
];

const purchases = [
  { name: 'Бетон М300', supplier: 'КазаньБетон', project: projects[0].name, quantity: '12 м³', price: '96 000 ₽', status: 'Заказано', tone: 'blue' },
  { name: 'Утеплитель минеральный', supplier: 'СтройМаркет', project: projects[2].name, quantity: '48 уп.', price: '138 400 ₽', status: 'Ожидает доставки', tone: 'amber' },
  { name: 'Арматура А500С, 12 мм', supplier: 'МеталлКомплект', project: projects[1].name, quantity: '1,2 т', price: '82 500 ₽', status: 'Доставлено', tone: 'green' },
];

const documents = [
  { name: 'Договор подряда № Д-026', type: 'Договор', project: projects[0].name, date: '12 мая 2026', size: '2,4 МБ' },
  { name: 'Смета — версия 3', type: 'Смета', project: projects[0].name, date: '18 мая 2026', size: '840 КБ' },
  { name: 'Акт приёмки фундамента', type: 'Акт', project: projects[1].name, date: '9 ноября 2026', size: '1,1 МБ' },
  { name: 'Фотоотчёт — ноябрь', type: 'Фото', project: projects[2].name, date: '18 ноября 2026', size: '12,8 МБ' },
];

const stages = [
  { name: 'Подготовка участка', progress: 100, status: 'Завершён', date: '12 мая' },
  { name: 'Фундамент', progress: 100, status: 'Завершён', date: '2 июн' },
  { name: 'Возведение стен', progress: 72, status: 'В работе', date: '20 июн – 8 авг' },
  { name: 'Кровля', progress: 0, status: 'Запланирован', date: '10 авг – 1 сен' },
  { name: 'Коммуникации', progress: 0, status: 'Запланирован', date: '3 – 25 сен' },
  { name: 'Отделка и сдача', progress: 0, status: 'Запланирован', date: '28 сен – 24 окт' },
];

function Icon({ name, size = 18 }) {
  const shared = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.7,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': true,
  };

  const shapes = {
    overview: <><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></>,
    house: <><path d="m3 10 9-7 9 7" /><path d="M5 9v11h14V9M9 20v-7h6v7" /></>,
    users: <><path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="10" cy="7" r="4" /><path d="M20 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8" /></>,
    tasks: <><rect x="4" y="4" width="16" height="17" rx="2" /><path d="M9 4V3h6v1M8 10h8M8 14h8M8 18h4" /></>,
    box: <><path d="m12 3 9 5-9 5-9-5 9-5Z" /><path d="m3 8 9 5 9-5M3 8v9l9 5 9-5V8M12 13v9" /></>,
    wallet: <><rect x="3" y="5" width="18" height="15" rx="2" /><path d="M3 9h18M16 15h2" /></>,
    file: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" /><path d="M14 2v6h6M8 13h8M8 17h6" /></>,
    settings: <><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-1.8 1.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5v.2h-2.6v-.2a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.9.3l-.1.1-1.8-1.8.1-.1A1.7 1.7 0 0 0 8 15a1.7 1.7 0 0 0-1.5-1H6.3v-2.6h.2a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.9l-.1-.1 1.8-1.8.1.1a1.7 1.7 0 0 0 1.9.3 1.7 1.7 0 0 0 1-1.5v-.2H15v.2a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1 1.8 1.8-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.5 1h.2V14h-.2a1.7 1.7 0 0 0-1.5 1Z" /></>,
    search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>,
    bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4" /></>,
    plus: <><path d="M12 5v14M5 12h14" /></>,
    arrow: <><path d="M5 12h14M13 6l6 6-6 6" /></>,
    chevron: <path d="m9 18 6-6-6-6" />,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
    download: <><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" /></>,
    more: <><circle cx="5" cy="12" r="1" /><circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /></>,
    check: <path d="m5 12 4 4L19 6" />,
    close: <><path d="m18 6-12 12M6 6l12 12" /></>,
  };

  return <svg {...shared}>{shapes[name]}</svg>;
}

function Brand() {
  return (
    <div className="brand">
      <div className="brand-mark"><Icon name="house" size={19} /></div>
      <div className="brand-name">строй<span>контроль</span><small>CRM ДЛЯ СТРОИТЕЛЬСТВА</small></div>
    </div>
  );
}

function Sidebar({ activePage, setActivePage }) {
  return (
    <aside className="sidebar">
      <Brand />
      <div className="workspace-switcher">
        <div className="company-monogram">СК</div>
        <div><strong>СтройКонтроль</strong><span>Казань и область</span></div>
        <span className="switcher-arrow">⌄</span>
      </div>

      <div className="sidebar-label">РАБОЧАЯ ОБЛАСТЬ</div>
      <nav className="navigation" aria-label="Основная навигация">
        {navigation.map((item) => (
          <button
            className={`nav-link ${activePage === item.id ? 'is-active' : ''}`}
            key={item.id}
            onClick={() => setActivePage(item.id)}
          >
            <Icon name={item.icon} />
            <span>{item.label}</span>
            {item.count && <small>{item.count}</small>}
          </button>
        ))}
      </nav>

      <div className="sidebar-label tools-label">КОМАНДА</div>
      <button className="nav-link" onClick={() => setActivePage('settings')}>
        <Icon name="settings" /><span>Настройки</span>
      </button>

      <div className="sidebar-bottom">
        <div className="support-card">
          <div className="support-icon">?</div>
          <strong>Всё под контролем</strong>
          <p>Объекты, задачи и бюджет — в одном месте.</p>
          <button onClick={() => setActivePage('help')}>Как это работает <Icon name="arrow" size={14} /></button>
        </div>
        <div className="user-profile">
          <div className="user-avatar">АД</div>
          <div><strong>Александр Данилов</strong><span>Руководитель</span></div>
          <Icon name="more" size={17} />
        </div>
      </div>
    </aside>
  );
}

function Topbar({ title }) {
  return (
    <header className="topbar">
      <div className="breadcrumb"><span>СтройКонтроль</span><Icon name="chevron" size={13} /><strong>{title}</strong></div>
      <div className="topbar-actions">
        <button className="search-control"><Icon name="search" size={17} /><span>Найти объект, задачу...</span><kbd>⌘ K</kbd></button>
        <button className="icon-control notification-control" aria-label="Уведомления"><Icon name="bell" size={18} /><i /></button>
        <div className="topbar-avatar">АД</div>
      </div>
    </header>
  );
}

function PageHeading({ eyebrow, title, description, action, onAction }) {
  return (
    <div className="page-heading">
      <div>
        <div className="eyebrow">{eyebrow}</div>
        <h1>{title}</h1>
        {description && <p>{description}</p>}
      </div>
      {action && <button className="button-primary" onClick={onAction}><Icon name="plus" size={17} />{action}</button>}
    </div>
  );
}

function MetricCard({ label, value, caption, icon, color, trend }) {
  return (
    <article className="metric-card">
      <div className="metric-card-top"><span>{label}</span><div className={`metric-icon ${color}`}><Icon name={icon} size={17} /></div></div>
      <strong className="metric-value">{value}</strong>
      <div className="metric-caption">{trend && <b>{trend}</b>}{caption}</div>
    </article>
  );
}

function ProgressBar({ value, color = 'green' }) {
  return <div className={`progress-bar ${color}`}><span style={{ width: `${value}%` }} /></div>;
}

function HouseArtwork({ stage = 5, compact = false, tone = 'sand' }) {
  const stageName = stages[stage]?.name ?? stages[5].name;
  const artworkId = React.useId().replaceAll(':', '');

  return (
    <svg
      className={`house-artwork ${compact ? 'compact-artwork' : ''} artwork-${tone} artwork-stage-${stage}`}
      viewBox="0 0 720 400"
      role="img"
      aria-label={`Архитектурная визуализация: ${stageName}`}
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id={`${artworkId}-sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#333645" />
          <stop offset="1" stopColor="#77717e" />
        </linearGradient>
        <linearGradient id={`${artworkId}-wall`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#d8d0c9" />
          <stop offset="1" stopColor="#a99ea2" />
        </linearGradient>
        <linearGradient id={`${artworkId}-side`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#918994" />
          <stop offset="1" stopColor="#686573" />
        </linearGradient>
        <linearGradient id={`${artworkId}-roof`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#776a7d" />
          <stop offset="1" stopColor="#4e4958" />
        </linearGradient>
        <linearGradient id={`${artworkId}-glass`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#b9ced0" />
          <stop offset="1" stopColor="#728b96" />
        </linearGradient>
        <filter id={`${artworkId}-shadow`} x="-30%" y="-30%" width="160%" height="180%">
          <feGaussianBlur stdDeviation="12" />
        </filter>
      </defs>

      <rect width="720" height="400" fill={`url(#${artworkId}-sky)`} />
      <circle cx="560" cy="92" r="44" fill="#e4c9a5" opacity=".22" />
      <path d="M0 250 Q125 190 246 247 T500 230 T720 245 V400 H0Z" fill="#5a5d62" opacity=".75" />
      <path d="M0 282 Q180 235 340 275 T720 260 V400 H0Z" fill="#464a50" />
      <path d="M0 335 Q170 302 320 335 T720 314 V400 H0Z" fill="#34383f" />

      <g className="artwork-trees" fill="#343c3d">
        <path d="M70 273 105 173 140 273Z" />
        <path d="M105 273 147 150 187 273Z" />
        <path d="M560 276 594 179 628 276Z" />
        <path d="M606 277 645 158 686 277Z" />
        <path d="M102 270v49h9v-49M145 270v49h9v-49M591 270v48h8v-48M642 270v50h9v-50" fill="#292d31" />
      </g>

      <ellipse cx="370" cy="329" rx="204" ry="25" fill="#17171c" opacity=".38" filter={`url(#${artworkId}-shadow)`} />
      <g className="artwork-site-pad">
        <path d="M155 320h410l-30 44H185Z" fill="#938b8e" />
        <path d="M185 364h350v16H185Z" fill="#756f77" />
      </g>

      <g className="artwork-foundation">
        <path d="M225 294h270v28H225Z" fill="#a6988f" stroke="#d6c8bc" strokeWidth="2" />
        <path d="M225 322h270v14H225Z" fill="#746c69" />
      </g>

      <g className="artwork-frame">
        <path d="M225 150h270v144H225Z" fill="none" stroke="#c9ad7a" strokeWidth="8" />
        <path d="M293 152v140m134-140v140M227 220h266" fill="none" stroke="#c9ad7a" strokeWidth="6" />
        <path d="m205 152 155-74 155 74" fill="none" stroke="#dec493" strokeWidth="7" />
      </g>

      <g className="artwork-walls">
        <path d="M225 150h270v144H225Z" fill={`url(#${artworkId}-wall)`} stroke="#eee3d9" strokeWidth="3" />
        <path d="m225 150 135-62 135 62Z" fill={`url(#${artworkId}-wall)`} stroke="#eee3d9" strokeWidth="3" />
      </g>

      <g className="artwork-roof">
        <path d="m205 152 155-76 155 76-15 14-140-66-140 66Z" fill={`url(#${artworkId}-roof)`} stroke="#c7b8cc" strokeWidth="3" />
        <path d="M205 152h310l-15 14H220Z" fill="#494550" opacity=".85" />
      </g>

      <g className="artwork-windows">
        <path d="M252 184h66v57h-66Zm150 0h66v57h-66Z" fill={`url(#${artworkId}-glass)`} stroke="#f0e8e5" strokeWidth="5" />
        <path d="M285 184v57m-33-28h66m117-29v57m-33-28h66" stroke="#e7dedf" strokeWidth="3" />
      </g>

      <g className="artwork-entry">
        <path d="M337 230h50v64h-50Z" fill="#625762" stroke="#e4d8d7" strokeWidth="3" />
        <circle cx="375" cy="263" r="2.5" fill="#d9c49b" />
        <path d="M328 295h68v9h-68Z" fill="#d7c9bf" />
      </g>

      <g className="artwork-scaffolding" fill="none" stroke="#d8bc8c" strokeWidth="4">
        <path d="M206 148v160m48-177v164m48-177v162m48-176v174m48-156v148m48-136v123m48-128v126" />
        <path d="M202 190h299M202 237h299M202 284h299M202 308l94-156m-48 157 95-163m2 163 94-145m1 122 79-111" />
      </g>

      <g className="artwork-landscape" fill="#2e3837">
        <path d="M112 329h40v5h-40zm425 0h37v5h-37z" />
        <circle cx="133" cy="323" r="15" /><circle cx="548" cy="325" r="14" />
        <path d="M130 333v14m418-14v14" stroke="#252a2c" strokeWidth="5" />
      </g>
    </svg>
  );
}

function ProjectCard({ project, onOpen }) {
  return (
    <button className="project-card" onClick={onOpen}>
      <div className={`project-cover cover-${project.tone}`}>
        <HouseArtwork compact stage={project.stageIndex} tone={project.tone} />
        <div className="project-cover-overlay">
          <span className="project-code">{project.code} · ЧАСТНЫЙ ДОМ</span>
          <span className="cover-status"><i />В работе</span>
        </div>
      </div>
      <div className="project-card-content">
        <div className="project-title-row">
          <div><h3>{project.name}</h3><p>{project.address}</p></div>
          <span className={`client-avatar ${project.tone}`}>{project.initials}</span>
        </div>
        <div className="stage-line"><span>Текущий этап</span><strong>{project.stage}</strong></div>
        <div className="project-progress-label"><span>Готовность</span><strong>{project.progress}%</strong></div>
        <ProgressBar value={project.progress} />
        <div className="project-meta"><span><Icon name="clock" size={14} />Сдача {project.deadline}</span><Icon name="chevron" size={16} /></div>
      </div>
    </button>
  );
}

function TaskRows({ items = tasks }) {
  const [done, setDone] = useState([]);
  return (
    <div className="task-table">
      {items.map((task) => {
        const isDone = done.includes(task.id);
        return (
          <div className={`task-row ${isDone ? 'task-is-done' : ''}`} key={task.id}>
            <button className={`task-toggle ${isDone ? 'checked' : ''}`} aria-label="Отметить задачу" onClick={() => setDone(isDone ? done.filter((id) => id !== task.id) : [...done, task.id])}>
              {isDone && <Icon name="check" size={12} />}
            </button>
            <div className="task-name"><strong>{task.title}</strong><span>{task.project}</span></div>
            <span className={`status-tag ${task.tone}`}>{task.status}</span>
            <span className="task-date">{task.date}</span>
            <span className="task-owner">{task.owner}</span>
          </div>
        );
      })}
    </div>
  );
}

function OverviewPage({ onNavigate, onAddProject, onOpenProject }) {
  return (
    <>
      <PageHeading
        eyebrow="СУББОТА, 21 НОЯБРЯ 2026 · РАБОЧИЙ ДЕНЬ 325"
        title="Доброе утро, Александр"
        description="Вот текущая картина по объектам и команде."
        action="Создать объект"
        onAction={onAddProject}
      />

      <section className="metrics-grid dashboard-metrics">
        <MetricCard label="Объекты в работе" value="03" caption="Все проекты активны" icon="house" color="olive" trend="+1" />
        <MetricCard label="Задачи на сегодня" value="08" caption="5 завершено из 24" icon="tasks" color="orange" trend="5/8" />
        <MetricCard label="Расходы за ноябрь" value="2,84 млн ₽" caption="64% от планового бюджета" icon="wallet" color="blue" trend="↘ 8%" />
        <MetricCard label="Ожидают оплаты" value="680 тыс. ₽" caption="2 счёта до 25 ноября" icon="file" color="violet" trend="2" />
      </section>

      <section className="dashboard-layout">
        <div className="dashboard-main-column">
          <article className="panel dashboard-projects-panel">
            <div className="section-heading">
              <div><div className="eyebrow">ПОРТФЕЛЬ ПРОЕКТОВ <span className="count-chip">03</span></div><h2>Объекты в работе</h2></div>
              <button className="button-quiet" onClick={() => onNavigate('projects')}>Все объекты <Icon name="arrow" size={16} /></button>
            </div>
            <div className="dashboard-project-list">{projects.map((project) => <ProjectCard key={project.id} project={project} onOpen={() => onOpenProject(project)} />)}</div>
          </article>
        </div>
        <aside className="dashboard-side-column">
          <article className="panel task-panel">
            <div className="section-heading compact-heading">
              <div><div className="eyebrow">ПЛАНИРОВАНИЕ</div><h2>Задачи команды</h2></div>
              <button className="button-quiet" onClick={() => onNavigate('tasks')}>Все <Icon name="arrow" size={15} /></button>
            </div>
            <TaskRows items={tasks.slice(0, 3)} />
          </article>
          <article className="dashboard-note">
            <span className="dashboard-note-icon"><Icon name="wallet" size={16} /></span>
            <div><strong>Расходы за ноябрь</strong><span>2,84 млн ₽ из планового бюджета</span></div>
            <b>64%</b>
          </article>
        </aside>
      </section>
    </>
  );
}

function ProjectsPage({ onAddProject, onOpenProject }) {
  return (
    <>
      <PageHeading eyebrow="УПРАВЛЕНИЕ СТРОИТЕЛЬСТВОМ" title="Объекты" description="Проекты домов, этапы работ и сроки сдачи." action="Новый объект" onAction={onAddProject} />
      <section className="metrics-grid small-metrics">
        <MetricCard label="Все объекты" value="03" caption="За всё время" icon="house" color="olive" />
        <MetricCard label="В работе" value="03" caption="По графику" icon="clock" color="blue" />
        <MetricCard label="Общий бюджет" value="23,75 млн ₽" caption="На три проекта" icon="wallet" color="orange" />
      </section>
      <section className="content-section">
        <div className="section-heading"><div><div className="eyebrow">ВСЕ ПРОЕКТЫ</div><h2>Строящиеся дома</h2></div><div className="filter-select">Все статусы <span>⌄</span></div></div>
        <div className="project-grid project-grid-large">{projects.map((project) => <ProjectCard key={project.id} project={project} onOpen={() => onOpenProject(project)} />)}</div>
      </section>
    </>
  );
}

function ClientsPage({ onAddClient }) {
  return (
    <>
      <PageHeading eyebrow="ОТНОШЕНИЯ С ЗАКАЗЧИКАМИ" title="Клиенты" description="Контакты заказчиков и история работы по объектам." action="Добавить клиента" onAction={onAddClient} />
      <section className="metrics-grid small-metrics"><MetricCard label="Всего клиентов" value="12" caption="В базе компании" icon="users" color="olive" /><MetricCard label="Активные проекты" value="03" caption="Сейчас в работе" icon="house" color="blue" /><MetricCard label="Новые обращения" value="04" caption="За последние 30 дней" icon="tasks" color="orange" /></section>
      <section className="panel data-panel">
        <div className="section-heading"><div><div className="eyebrow">КЛИЕНТСКАЯ БАЗА</div><h2>Заказчики</h2></div><button className="button-quiet"><Icon name="search" size={16} />Поиск по клиентам</button></div>
        <div className="table-head client-table-grid"><span>КЛИЕНТ</span><span>КОНТАКТЫ</span><span>ОБЪЕКТ</span><span>СТАТУС</span></div>
        {clients.map((client) => <div className="data-row client-table-grid" key={client.name}><div className="client-cell"><span className="client-avatar green">{client.initials}</span><strong>{client.name}</strong></div><div className="contact-cell"><strong>{client.phone}</strong><span>{client.email}</span></div><div className="table-project-name">{client.project}</div><span className="status-tag green">{client.status}</span></div>)}
      </section>
    </>
  );
}

function TasksPage({ onAddTask }) {
  return (
    <>
      <PageHeading eyebrow="РАБОТА КОМАНДЫ" title="Задачи" description="Планируйте работы и следите за сроками на объектах." action="Новая задача" onAction={onAddTask} />
      <section className="metrics-grid small-metrics"><MetricCard label="Всего задач" value="24" caption="По всем объектам" icon="tasks" color="blue" /><MetricCard label="На сегодня" value="08" caption="5 ещё предстоит" icon="clock" color="orange" /><MetricCard label="Просрочено" value="02" caption="Требуют внимания" icon="bell" color="violet" /></section>
      <section className="panel data-panel">
        <div className="section-heading"><div><div className="eyebrow">ПЛАН РАБОТ</div><h2>Все задачи</h2></div><div className="filter-select">Все исполнители <span>⌄</span></div></div>
        <div className="task-table task-table-page"><div className="table-head task-table-grid"><span>ЗАДАЧА</span><span>СТАТУС</span><span>СРОК</span><span>ИСПОЛНИТЕЛЬ</span></div><TaskRows /></div>
      </section>
    </>
  );
}

function PurchasesPage({ onAddPurchase }) {
  return (
    <>
      <PageHeading eyebrow="МАТЕРИАЛЫ И ПОСТАВКИ" title="Закупки" description="Заявки на материалы, поставщики и доставки на объекты." action="Новая закупка" onAction={onAddPurchase} />
      <section className="metrics-grid small-metrics"><MetricCard label="Активные заявки" value="06" caption="По трём объектам" icon="box" color="olive" /><MetricCard label="Ожидают доставки" value="03" caption="Ближайшая — завтра" icon="clock" color="orange" /><MetricCard label="Закупки за месяц" value="842 тыс. ₽" caption="Ноябрь 2026" icon="wallet" color="blue" /></section>
      <section className="panel data-panel">
        <div className="section-heading"><div><div className="eyebrow">ЗАЯВКИ НА МАТЕРИАЛЫ</div><h2>Последние закупки</h2></div><div className="filter-select">Все статусы <span>⌄</span></div></div>
        <div className="table-head purchase-table-grid"><span>МАТЕРИАЛ</span><span>ОБЪЕКТ</span><span>КОЛИЧЕСТВО</span><span>СУММА</span><span>СТАТУС</span></div>
        {purchases.map((purchase) => <div className="data-row purchase-table-grid" key={purchase.name}><div className="material-cell"><span className="material-icon"><Icon name="box" size={17} /></span><div><strong>{purchase.name}</strong><span>{purchase.supplier}</span></div></div><div className="table-project-name">{purchase.project}</div><span>{purchase.quantity}</span><strong>{purchase.price}</strong><span className={`status-tag ${purchase.tone}`}>{purchase.status}</span></div>)}
      </section>
    </>
  );
}

function FinancesPage() {
  return (
    <>
      <PageHeading eyebrow="ПЛАН И ФАКТ" title="Финансы" description="Бюджеты объектов, расходы на строительство и оплаты заказчиков." action="Добавить операцию" onAction={() => window.alert('Форма операции появится на следующем этапе.')} />
      <section className="metrics-grid small-metrics"><MetricCard label="Общий бюджет" value="23,75 млн ₽" caption="По активным договорам" icon="wallet" color="olive" /><MetricCard label="Фактические расходы" value="14,33 млн ₽" caption="60% от общего бюджета" icon="box" color="orange" /><MetricCard label="Оплаты клиентов" value="9,82 млн ₽" caption="Поступило в этом месяце" icon="file" color="blue" /></section>
      <section className="finance-grid">
        <article className="panel budget-panel"><div className="section-heading"><div><div className="eyebrow">КОНТРОЛЬ БЮДЖЕТА</div><h2>Расходы по объектам</h2></div><span className="period-pill">Ноябрь 2026⌄</span></div>
          {projects.map((project) => <div className="budget-row" key={project.id}><div className="budget-row-top"><div><strong>{project.name}</strong><span>{project.code} · {project.stage}</span></div><b>{project.progress === 24 ? '18%' : `${project.progress - 4}%`}</b></div><ProgressBar value={project.progress === 24 ? 18 : project.progress - 4} color={project.tone} /><div className="budget-row-bottom"><span>Факт: {project.spent}</span><span>План: {project.budget}</span></div></div>)}
        </article>
        <article className="panel payment-panel"><div className="eyebrow">ОЖИДАЮТ ОПЛАТЫ</div><h2>Счета клиентам</h2><div className="invoice-total">680 000 ₽<span>2 счета</span></div><div className="invoice-item"><span className="invoice-date">25<br />НОЯ</span><div><strong>Оплата за этап «Фундамент»</strong><span>Анна и Михаил Петровы</span></div><b>420 000 ₽</b></div><div className="invoice-item"><span className="invoice-date">28<br />НОЯ</span><div><strong>Доплата по смете № 3</strong><span>Александр Соколов</span></div><b>260 000 ₽</b></div><button className="button-quiet payment-link">Все счета <Icon name="arrow" size={15} /></button></article>
      </section>
    </>
  );
}

function DocumentsPage({ onUpload }) {
  return (
    <>
      <PageHeading eyebrow="ФАЙЛЫ ПРОЕКТОВ" title="Документы" description="Договоры, сметы, акты и фотоотчёты по объектам." action="Загрузить файл" onAction={onUpload} />
      <section className="metrics-grid small-metrics"><MetricCard label="Всего документов" value="38" caption="По трём объектам" icon="file" color="olive" /><MetricCard label="Договоры и сметы" value="09" caption="Юридические документы" icon="tasks" color="blue" /><MetricCard label="Фотоотчёты" value="16" caption="С объектов строительства" icon="house" color="orange" /></section>
      <section className="panel data-panel"><div className="section-heading"><div><div className="eyebrow">АРХИВ ФАЙЛОВ</div><h2>Последние документы</h2></div><div className="filter-select">Все типы <span>⌄</span></div></div><div className="table-head document-table-grid"><span>НАЗВАНИЕ</span><span>ОБЪЕКТ</span><span>ДОБАВЛЕН</span><span>РАЗМЕР</span><span /></div>{documents.map((doc) => <div className="data-row document-table-grid" key={doc.name}><div className="document-cell"><span className={`document-type type-${doc.type === 'Фото' ? 'photo' : 'pdf'}`}>{doc.type === 'Фото' ? 'IMG' : 'PDF'}</span><div><strong>{doc.name}</strong><span>{doc.type}</span></div></div><div className="table-project-name">{doc.project}</div><span className="date-cell">{doc.date}</span><span className="date-cell">{doc.size}</span><button className="icon-control download-button" aria-label="Скачать"><Icon name="download" size={16} /></button></div>)}</section>
    </>
  );
}

function ProjectDetail({ project, onBack }) {
  const initialStage = project.stageIndex;
  const [selectedStage, setSelectedStage] = useState(initialStage);
  const [isPlaying, setIsPlaying] = useState(false);

  React.useEffect(() => {
    if (!isPlaying) return undefined;
    const timer = window.setInterval(() => {
      setSelectedStage((current) => (current + 1) % stages.length);
    }, 2200);
    return () => window.clearInterval(timer);
  }, [isPlaying]);

  return (
    <>
      <div className="detail-back"><button className="button-quiet" onClick={onBack}>← Все объекты</button><span>Объекты / {project.code}</span></div>
      <section className="model-viewer">
        <div className="model-viewer-top">
          <div>
            <div className="eyebrow">{project.code} · ВИЗУАЛИЗАЦИЯ ОБЪЕКТА</div>
            <h1>{project.name}</h1>
            <p>{project.address}</p>
          </div>
          <div className="viewer-progress"><strong>{project.progress}%</strong><span>готовность проекта</span></div>
        </div>
        <div className={`construction-scene stage-${selectedStage}`}>
          <HouseArtwork stage={selectedStage} tone={project.tone} />
          <div className="scene-vignette" />
          <div className="scene-stage-caption">
            <span className="scene-label">ЭТАП {String(selectedStage + 1).padStart(2, '0')} · ВИЗУАЛИЗАЦИЯ</span>
            <strong>{stages[selectedStage].name}</strong>
          </div>
          <div className="scene-controls">
            <button className="scene-step-button" onClick={() => setSelectedStage((selectedStage + stages.length - 1) % stages.length)} aria-label="Предыдущий этап">←</button>
            <button className={`scene-play-button ${isPlaying ? 'playing' : ''}`} onClick={() => setIsPlaying(!isPlaying)}>{isPlaying ? 'Ⅱ  Пауза' : '▶  Смотреть процесс'}</button>
            <button className="scene-step-button" onClick={() => setSelectedStage((selectedStage + 1) % stages.length)} aria-label="Следующий этап">→</button>
          </div>
        </div>
        <div className="stage-selector">
          {stages.map((stage, index) => (
            <button className={`stage-select ${index === selectedStage ? 'selected' : ''} ${stage.progress === 100 ? 'completed' : ''}`} key={stage.name} onClick={() => { setSelectedStage(index); setIsPlaying(false); }}>
              <span className="stage-select-index">{String(index + 1).padStart(2, '0')}</span>
              <span className="stage-select-name">{stage.name}</span>
              <span className="stage-select-status">{index === initialStage ? 'Текущий этап' : stage.status}</span>
            </button>
          ))}
        </div>
      </section>
      <section className="metrics-grid detail-metrics"><MetricCard label="Заказчик" value={project.client} caption="Открыть карточку клиента" icon="users" color="olive" /><MetricCard label="Бюджет проекта" value={project.budget} caption={`Факт: ${project.spent}`} icon="wallet" color="blue" /><MetricCard label="Срок сдачи" value={project.deadline} caption="Осталось 47 дней" icon="clock" color="orange" /></section>
      <section className="detail-grid"><article className="panel stages-panel"><div className="section-heading"><div><div className="eyebrow">ПЛАН РАБОТ</div><h2>Этапы строительства</h2></div><button className="button-quiet"><Icon name="plus" size={15} />Этап</button></div><div className="stage-list">{stages.map((stage, i) => <div className={`stage-item ${stage.progress === 100 ? 'stage-complete' : ''} ${stage.progress > 0 && stage.progress < 100 ? 'stage-current' : ''}`} key={stage.name}><div className="stage-marker">{stage.progress === 100 ? <Icon name="check" size={13} /> : <span>{String(i + 1).padStart(2, '0')}</span>}</div><div className="stage-content"><div className="stage-heading"><strong>{stage.name}</strong><span>{stage.status}</span></div><div className="stage-detail"><span>{stage.date}</span>{stage.progress > 0 && <span>{stage.progress}%</span>}</div>{stage.progress > 0 && <ProgressBar value={stage.progress} />}</div></div>)}</div></article><article className="panel detail-side-panel"><div className="eyebrow">СВОДКА</div><h2>По проекту</h2><div className="detail-stat"><span>Ответственный прораб</span><strong>Михаил Кузнецов</strong></div><div className="detail-stat"><span>Дата начала</span><strong>12 мая 2026</strong></div><div className="detail-stat"><span>Площадь дома</span><strong>186 м²</strong></div><div className="detail-stat"><span>Следующая задача</span><strong>Залить плиту перекрытия</strong></div><button className="button-secondary">Открыть все задачи <Icon name="arrow" size={15} /></button></article></section>
    </>
  );
}

function SettingsPage() {
  return <><PageHeading eyebrow="ПРОФИЛЬ КОМПАНИИ" title="Настройки" description="Параметры рабочего пространства и вашей команды." /><section className="panel settings-panel"><div className="settings-heading"><div className="company-monogram large">СК</div><div><h2>СтройКонтроль</h2><span>Строительная компания · Казань</span></div><button className="button-secondary">Изменить данные</button></div><div className="settings-fields"><div><span>Название компании</span><strong>СтройКонтроль</strong></div><div><span>Город</span><strong>Казань и область</strong></div><div><span>Руководитель</span><strong>Александр Данилов</strong></div><div><span>В команде</span><strong>8 сотрудников</strong></div></div></section></>;
}

function EmptyPage({ title, onBack }) {
  return <section className="empty-state panel"><div className="empty-state-icon"><Icon name="house" size={26} /></div><div className="eyebrow">РАЗДЕЛ ПРОЕКТА</div><h1>{title}</h1><p>Этот раздел добавим следующим этапом разработки. Сейчас готовы макеты основных страниц CRM.</p><button className="button-primary" onClick={onBack}>Вернуться к обзору <Icon name="arrow" size={15} /></button></section>;
}

function CreateModal({ type, onClose, onSave }) {
  const configs = {
    project: { title: 'Новый объект', fields: [['Название проекта', 'Например, дом семьи Ивановых'], ['Адрес объекта', 'Посёлок, улица, участок'], ['Площадь дома', 'м²'], ['Бюджет проекта', '₽']] },
    client: { title: 'Новый клиент', fields: [['Имя заказчика', 'Имя и фамилия'], ['Телефон', '+7 (___) ___-__-__'], ['Электронная почта', 'name@example.ru'], ['Комментарий', 'Как связаться и что обсудили']] },
    task: { title: 'Новая задача', fields: [['Название задачи', 'Что нужно сделать'], ['Объект', 'Выберите объект'], ['Исполнитель', 'Имя сотрудника'], ['Срок выполнения', 'дд.мм.гггг']] },
    purchase: { title: 'Новая закупка', fields: [['Материал', 'Название материала'], ['Объект', 'Выберите объект'], ['Количество', 'Например, 10 м³'], ['Сумма', '₽']] },
  };
  const config = configs[type];

  return (
    <div className="modal-backdrop" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <form className="modal-card" onSubmit={(event) => { event.preventDefault(); onSave(); }}>
        <div className="modal-heading"><div><div className="eyebrow">СТРОЙКОНТРОЛЬ CRM</div><h2>{config.title}</h2></div><button type="button" className="icon-control" onClick={onClose} aria-label="Закрыть"><Icon name="close" /></button></div>
        <p className="modal-intro">Демо-форма интерфейса. Данные пока не сохраняются на сервер.</p>
        <div className="modal-fields">{config.fields.map(([label, placeholder]) => <label key={label}><span>{label}</span><input placeholder={placeholder} required /></label>)}</div>
        <div className="modal-actions"><button type="button" className="button-secondary" onClick={onClose}>Отмена</button><button type="submit" className="button-primary">Продолжить <Icon name="arrow" size={15} /></button></div>
      </form>
    </div>
  );
}

function App() {
  const [activePage, setActivePage] = useState('overview');
  const [activeProject, setActiveProject] = useState(null);
  const [modalType, setModalType] = useState(null);
  const [notice, setNotice] = useState('');

  const pageTitles = useMemo(() => Object.fromEntries(navigation.map((item) => [item.id, item.label])), []);

  function navigate(page) {
    setActiveProject(null);
    setActivePage(page);
    setNotice('');
  }

  function showNotice(message) {
    setModalType(null);
    setNotice(message);
    window.setTimeout(() => setNotice(''), 3500);
  }

  function renderPage() {
    if (activeProject) return <ProjectDetail project={activeProject} onBack={() => setActiveProject(null)} />;
    if (activePage === 'overview') return <OverviewPage onNavigate={navigate} onAddProject={() => setModalType('project')} onOpenProject={setActiveProject} />;
    if (activePage === 'projects') return <ProjectsPage onAddProject={() => setModalType('project')} onOpenProject={setActiveProject} />;
    if (activePage === 'clients') return <ClientsPage onAddClient={() => setModalType('client')} />;
    if (activePage === 'tasks') return <TasksPage onAddTask={() => setModalType('task')} />;
    if (activePage === 'purchases') return <PurchasesPage onAddPurchase={() => setModalType('purchase')} />;
    if (activePage === 'finances') return <FinancesPage />;
    if (activePage === 'documents') return <DocumentsPage onUpload={() => showNotice('Загрузка файлов появится на этапе подключения API.')} />;
    if (activePage === 'settings') return <SettingsPage />;
    return <EmptyPage title={activePage === 'help' ? 'Как устроен проект' : pageTitles[activePage] || 'Раздел'} onBack={() => navigate('overview')} />;
  }

  const title = activeProject ? activeProject.name : (pageTitles[activePage] || (activePage === 'settings' ? 'Настройки' : 'Помощь'));

  return (
    <div className="app-shell">
      <Sidebar activePage={activePage} setActivePage={navigate} />
      <main className="main-area">
        <Topbar title={title} />
        <div className="page-container">{renderPage()}<footer className="page-footer"><span>© 2026 СтройКонтроль CRM · Учебный проект</span><span>Панель руководителя <i /> Демо-данные</span></footer></div>
      </main>
      {modalType && <CreateModal type={modalType} onClose={() => setModalType(null)} onSave={() => showNotice('Форма готова. Сохранение подключим вместе с API.')} />}
      {notice && <div className="toast-message"><span className="toast-dot" />{notice}<button onClick={() => setNotice('')} aria-label="Закрыть"><Icon name="close" size={15} /></button></div>}
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);
