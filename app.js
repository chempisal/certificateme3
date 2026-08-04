/**
 * Khmer Certificate of Commendation Generator - App Logic
 */

document.addEventListener('DOMContentLoaded', () => {

    // --- Default State Data ---
    const defaultData = {
        ministry: 'ក្រសួងអប់រំ យុវជន និងកីឡា',
        office: 'ការិ.អយក នៃរដ្ឋបាលស្រុកជលគិរី',
        school: 'វិទ្យាល័យ ព្រះនរោត្តម សីហមុនី',
        principalTitle: 'នាយកវិទ្យាល័យ ព្រះនរោត្តម សីហមុនី',
        studentName: 'សស់ សៀងហេង',
        gender: 'ប្រុស',
        dobDay: '២៤',
        dobMonth: 'មេសា',
        dobYear: '២០១៤',
        grade: '៧"C"',
        rank: '៥',
        period: 'ប្រចាំខែឧសភា',
        academicYear: '២០២៥-២០២៦',
        lunarDate: 'ថ្ងៃចន្ទ ៥កើត ខែជេស្ឋ ឆ្នាំថោះ បញ្ចស័ក ព.ស. ២៥៧០',
        solarDate: 'វិ.ព្រះនរោត្តមសីហមុនី ថ្ងៃទី២៥ ខែឧសភា ឆ្នាំ២០២៦',
        principalName: 'នាយកសាលា',
        teacherName: 'គ្រូប្រចាំថ្នាក់',
        autoKhmerNum: true,
        showPhotoBox: true,
        photoDataUrl: null,
        logoDataUrl: null,
        framePreset: 'frame-kbach',
        customFrameDataUrl: null,
        themeColor: '#153285',
        titleColor: '#e53e3e',
        accentColor: '#d97706',
        fontSize: 18.5,
        titleSize: 44,
        elementOffsets: {}
    };

    let state = { ...defaultData };
    if (!state.elementOffsets) state.elementOffsets = {};

    // --- Frame Preset SVG Templates ---
    const frameTemplates = {
        'frame-kbach': `
            <rect x="6" y="6" width="1038" height="730" rx="4" stroke="currentColor" stroke-width="4" fill="none"/>
            <rect x="14" y="14" width="1022" height="714" rx="2" stroke="currentColor" stroke-width="1.5" fill="none"/>
            <rect x="18" y="18" width="1014" height="706" rx="2" stroke="currentColor" stroke-width="3" fill="none"/>
            <rect x="26" y="26" width="998" height="690" rx="1" stroke="currentColor" stroke-width="1.5" stroke-dasharray="4 2" fill="none"/>
            <rect x="30" y="30" width="990" height="682" rx="1" stroke="currentColor" stroke-width="2.5" fill="none"/>
            <g transform="translate(30, 30)">
                <path d="M0,0 L60,0 C40,10 30,25 30,50 C25,30 10,40 0,60 Z" fill="currentColor"/>
                <circle cx="18" cy="18" r="6" fill="currentColor"/>
                <path d="M4,4 L45,4 C30,12 22,22 22,45 C18,25 12,28 4,45 Z" fill="white" opacity="0.4"/>
            </g>
            <g transform="translate(1020, 30) scale(-1, 1)">
                <path d="M0,0 L60,0 C40,10 30,25 30,50 C25,30 10,40 0,60 Z" fill="currentColor"/>
                <circle cx="18" cy="18" r="6" fill="currentColor"/>
                <path d="M4,4 L45,4 C30,12 22,22 22,45 C18,25 12,28 4,45 Z" fill="white" opacity="0.4"/>
            </g>
            <g transform="translate(30, 712) scale(1, -1)">
                <path d="M0,0 L60,0 C40,10 30,25 30,50 C25,30 10,40 0,60 Z" fill="currentColor"/>
                <circle cx="18" cy="18" r="6" fill="currentColor"/>
                <path d="M4,4 L45,4 C30,12 22,22 22,45 C18,25 12,28 4,45 Z" fill="white" opacity="0.4"/>
            </g>
            <g transform="translate(1020, 712) scale(-1, -1)">
                <path d="M0,0 L60,0 C40,10 30,25 30,50 C25,30 10,40 0,60 Z" fill="currentColor"/>
                <circle cx="18" cy="18" r="6" fill="currentColor"/>
                <path d="M4,4 L45,4 C30,12 22,22 22,45 C18,25 12,28 4,45 Z" fill="white" opacity="0.4"/>
            </g>
            <g transform="translate(525, 30)">
                <path d="M-40,0 C-20,15 -10,25 0,35 C10,25 20,15 40,0 C20,8 10,12 0,16 C-10,12 -20,8 -40,0 Z" fill="currentColor"/>
            </g>
            <g transform="translate(525, 712) scale(1, -1)">
                <path d="M-40,0 C-20,15 -10,25 0,35 C10,25 20,15 40,0 C20,8 10,12 0,16 C-10,12 -20,8 -40,0 Z" fill="currentColor"/>
            </g>
            <path d="M 120 18 Q 150 10 180 18 Q 210 26 240 18 Q 270 10 300 18 Q 330 26 360 18 Q 390 10 420 18 Q 450 26 480 18 M 570 18 Q 600 10 630 18 Q 660 26 690 18 Q 720 10 750 18 Q 780 26 810 18 Q 840 10 870 18 Q 900 26 930 18" stroke="currentColor" stroke-width="1.5" fill="none"/>
            <path d="M 120 724 Q 150 716 180 724 Q 210 732 240 724 Q 270 716 300 724 Q 330 732 360 724 Q 390 716 420 724 Q 450 732 480 724 M 570 724 Q 600 716 630 724 Q 660 732 690 724 Q 720 716 750 724 Q 780 732 810 724 Q 840 716 870 724 Q 900 732 930 724" stroke="currentColor" stroke-width="1.5" fill="none"/>
        `,
        'frame-gold': `
            <rect x="8" y="8" width="1034" height="726" rx="6" stroke="currentColor" stroke-width="5" fill="none"/>
            <rect x="18" y="18" width="1014" height="706" rx="4" stroke="currentColor" stroke-width="2" fill="none"/>
            <rect x="28" y="28" width="994" height="686" rx="2" stroke="currentColor" stroke-width="4" fill="none"/>
            <g transform="translate(28, 28)">
                <path d="M0,0 L50,0 Q30,30 0,50 Z" fill="currentColor"/>
                <path d="M5,5 L40,5 L5,40 Z" fill="white" opacity="0.3"/>
                <circle cx="15" cy="15" r="5" fill="currentColor"/>
            </g>
            <g transform="translate(1022, 28) scale(-1, 1)">
                <path d="M0,0 L50,0 Q30,30 0,50 Z" fill="currentColor"/>
                <path d="M5,5 L40,5 L5,40 Z" fill="white" opacity="0.3"/>
                <circle cx="15" cy="15" r="5" fill="currentColor"/>
            </g>
            <g transform="translate(28, 714) scale(1, -1)">
                <path d="M0,0 L50,0 Q30,30 0,50 Z" fill="currentColor"/>
                <path d="M5,5 L40,5 L5,40 Z" fill="white" opacity="0.3"/>
                <circle cx="15" cy="15" r="5" fill="currentColor"/>
            </g>
            <g transform="translate(1022, 714) scale(-1, -1)">
                <path d="M0,0 L50,0 Q30,30 0,50 Z" fill="currentColor"/>
                <path d="M5,5 L40,5 L5,40 Z" fill="white" opacity="0.3"/>
                <circle cx="15" cy="15" r="5" fill="currentColor"/>
            </g>
            <g transform="translate(525, 28)">
                <polygon points="0,0 -35,20 0,38 35,20" fill="currentColor"/>
                <circle cx="0" cy="18" r="4" fill="white"/>
            </g>
            <g transform="translate(525, 714) scale(1, -1)">
                <polygon points="0,0 -35,20 0,38 35,20" fill="currentColor"/>
                <circle cx="0" cy="18" r="4" fill="white"/>
            </g>
        `,
        'frame-executive': `
            <rect x="10" y="10" width="1030" height="722" stroke="currentColor" stroke-width="3" fill="none"/>
            <rect x="16" y="16" width="1018" height="710" stroke="currentColor" stroke-width="1" fill="none"/>
            <rect x="24" y="24" width="1002" height="694" stroke="currentColor" stroke-width="3" fill="none"/>
            <rect x="30" y="30" width="990" height="682" stroke="currentColor" stroke-width="1" stroke-dasharray="8 4" fill="none"/>
            <g transform="translate(24, 24)">
                <polygon points="0,0 20,-10 40,0 20,10" fill="currentColor"/>
                <polygon points="0,0 -10,20 0,40 10,20" fill="currentColor"/>
            </g>
            <g transform="translate(1026, 24) scale(-1, 1)">
                <polygon points="0,0 20,-10 40,0 20,10" fill="currentColor"/>
                <polygon points="0,0 -10,20 0,40 10,20" fill="currentColor"/>
            </g>
            <g transform="translate(24, 718) scale(1, -1)">
                <polygon points="0,0 20,-10 40,0 20,10" fill="currentColor"/>
                <polygon points="0,0 -10,20 0,40 10,20" fill="currentColor"/>
            </g>
            <g transform="translate(1026, 718) scale(-1, -1)">
                <polygon points="0,0 20,-10 40,0 20,10" fill="currentColor"/>
                <polygon points="0,0 -10,20 0,40 10,20" fill="currentColor"/>
            </g>
        `,
        'frame-floral': `
            <rect x="8" y="8" width="1034" height="726" rx="10" stroke="currentColor" stroke-width="4" fill="none"/>
            <rect x="20" y="20" width="1010" height="702" rx="6" stroke="currentColor" stroke-width="2" stroke-dasharray="6 3" fill="none"/>
            <rect x="28" y="28" width="994" height="686" rx="4" stroke="currentColor" stroke-width="2" fill="none"/>
            <g transform="translate(28, 28)">
                <circle cx="15" cy="15" r="14" fill="none" stroke="currentColor" stroke-width="2"/>
                <circle cx="15" cy="15" r="6" fill="currentColor"/>
                <path d="M15,0 L15,30 M0,15 L30,15" stroke="currentColor" stroke-width="1.5"/>
            </g>
            <g transform="translate(1022, 28)">
                <circle cx="-15" cy="15" r="14" fill="none" stroke="currentColor" stroke-width="2"/>
                <circle cx="-15" cy="15" r="6" fill="currentColor"/>
                <path d="M-15,0 L-15,30 M-30,15 L0,15" stroke="currentColor" stroke-width="1.5"/>
            </g>
            <g transform="translate(28, 714)">
                <circle cx="15" cy="-15" r="14" fill="none" stroke="currentColor" stroke-width="2"/>
                <circle cx="15" cy="-15" r="6" fill="currentColor"/>
                <path d="M15,0 L15,-30 M0,-15 L30,-15" stroke="currentColor" stroke-width="1.5"/>
            </g>
            <g transform="translate(1022, 714)">
                <circle cx="-15" cy="-15" r="14" fill="none" stroke="currentColor" stroke-width="2"/>
                <circle cx="-15" cy="-15" r="6" fill="currentColor"/>
                <path d="M-15,0 L-15,-30 M-30,-15 L0,-15" stroke="currentColor" stroke-width="1.5"/>
            </g>
        `
    };

    // --- Demo Batch Students List ---
    let batchStudents = [
        { name: 'សស់ សៀងហេង', gender: 'ប្រុស', dobDay: '២៤', dobMonth: 'មេសា', dobYear: '២០១៤', grade: '៧"C"', rank: '៥' },
        { name: 'កែវ សុភា', gender: 'ស្រី', dobDay: '១៥', dobMonth: 'មករា', dobYear: '២០១៤', grade: '៧"C"', rank: '១' },
        { name: 'ចាន់ វិចិត្រ', gender: 'ប្រុស', dobDay: '០៨', dobMonth: 'កុម្ភៈ', dobYear: '២០១៤', grade: '៧"C"', rank: '២' },
        { name: 'ហេង សុវណ្ណារី', gender: 'ស្រី', dobDay: '៣០', dobMonth: 'តុលា', dobYear: '២០១៤', grade: '៧"C"', rank: '៣' },
        { name: 'លី ប៊ុនធឿន', gender: 'ប្រុស', dobDay: '១២', dobMonth: 'កក្កដា', dobYear: '២០១៤', grade: '៧"C"', rank: '៤' }
    ];
    let currentBatchIndex = 0;

    // --- DOM Inputs ---
    const inputs = {
        ministry: document.getElementById('input-ministry'),
        office: document.getElementById('input-office'),
        school: document.getElementById('input-school'),
        principalTitle: document.getElementById('input-principal-title'),
        studentName: document.getElementById('input-student-name'),
        gender: document.getElementById('input-gender'),
        dobDay: document.getElementById('input-dob-day'),
        dobMonth: document.getElementById('input-dob-month'),
        dobYear: document.getElementById('input-dob-year'),
        grade: document.getElementById('input-grade'),
        rank: document.getElementById('input-rank'),
        period: document.getElementById('input-period'),
        academicYear: document.getElementById('input-academic-year'),
        lunarDate: document.getElementById('input-lunar-date'),
        solarDate: document.getElementById('input-solar-date'),
        principalName: document.getElementById('input-principal-name'),
        teacherName: document.getElementById('input-teacher-name'),
        autoKhmerNum: document.getElementById('input-auto-khmer-num'),
        photoFile: document.getElementById('input-photo-file'),
        logoFile: document.getElementById('input-logo-file'),
        togglePhotoBox: document.getElementById('toggle-photo-box'),
        titleColor: document.getElementById('input-title-color'),
        accentColor: document.getElementById('input-accent-color'),
        fontSize: document.getElementById('input-font-size'),
        titleSize: document.getElementById('input-title-size')
    };

    const certElements = {
        ministry: document.getElementById('cert-ministry'),
        office: document.getElementById('cert-office'),
        school: document.getElementById('cert-school'),
        principalTitle: document.getElementById('cert-principal-title'),
        studentName: document.getElementById('cert-student-name'),
        gender: document.getElementById('cert-gender'),
        dobDay: document.getElementById('cert-dob-day'),
        dobMonth: document.getElementById('cert-dob-month'),
        dobYear: document.getElementById('cert-dob-year'),
        grade: document.getElementById('cert-grade'),
        rank: document.getElementById('cert-rank'),
        period: document.getElementById('cert-period'),
        academicYear: document.getElementById('cert-academic-year'),
        lunarLeft: document.getElementById('cert-lunar-left'),
        lunarRight: document.getElementById('cert-lunar-right'),
        solarLeft: document.getElementById('cert-solar-left'),
        solarRight: document.getElementById('cert-solar-right'),
        principalSignLabel: document.getElementById('cert-principal-sign-label'),
        teacherName: document.getElementById('cert-teacher-name'),
        title: document.getElementById('cert-title'),
        bodyParagraph: document.getElementById('cert-body-paragraph'),
        photoContainer: document.getElementById('cert-photo-container'),
        photoImg: document.getElementById('cert-photo-img'),
        photoPlaceholder: document.getElementById('cert-photo-placeholder'),
        logoImg: document.getElementById('cert-logo'),
        frameSvg: document.getElementById('cert-frame-svg'),
        customFrameImg: document.getElementById('cert-custom-frame-img')
    };

    const btnRemoveCustomFrame = document.getElementById('btn-remove-custom-frame');
    const inputFrameFile = document.getElementById('input-frame-file');

    // --- Helper Functions ---
    function toKhmerDigits(str) {
        if (!str) return '';
        const khmerNums = ['០', '១', '២', '៣', '៤', '៥', '៦', '៧', '៨', '៩'];
        return String(str).replace(/[0-9]/g, (w) => khmerNums[parseInt(w)]);
    }

    function formatText(str) {
        if (!str) return '';
        return state.autoKhmerNum ? toKhmerDigits(str) : str;
    }

    function updateCountBadges() {
        const count = batchStudents.length;
        const pdfBadge = document.getElementById('count-badge-pdf');
        const wordBadge = document.getElementById('count-badge-word');
        const printBadge = document.getElementById('count-badge-print');
        if (pdfBadge) pdfBadge.textContent = count;
        if (wordBadge) wordBadge.textContent = count;
        if (printBadge) printBadge.textContent = count;
    }

    function getTransformStyle(id) {
        const offset = state.elementOffsets ? state.elementOffsets[id] : null;
        if (offset && (offset.x !== 0 || offset.y !== 0)) {
            return `transform: translate(${offset.x}px, ${offset.y}px);`;
        }
        return '';
    }

    // --- Helper to Generate Printable HTML for any Student ---
    function generateStudentCertificateMarkup(student) {
        const studentName = student.name;
        const gender = student.gender;
        const dobDay = formatText(student.dobDay);
        const dobMonth = student.dobMonth;
        const dobYear = formatText(student.dobYear);
        const grade = formatText(student.grade);
        const rank = formatText(student.rank);

        const svgMarkup = frameTemplates[state.framePreset] || frameTemplates['frame-kbach'];
        const frameContent = state.customFrameDataUrl ?
            `<img src="${state.customFrameDataUrl}" alt="Frame" class="w-full h-full object-fill pointer-events-none">` :
            `<svg class="w-full h-full border-svg-theme" viewBox="0 0 1050 742" fill="none" style="color: ${state.themeColor}">${svgMarkup}</svg>`;

        const logoSrc = state.logoDataUrl || "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='50' r='45' fill='%23153285' stroke='%23d97706' stroke-width='3'/><path d='M50 15 L58 35 L80 35 L62 48 L69 70 L50 56 L31 70 L38 48 L20 35 L42 35 Z' fill='%23fbbf24'/><circle cx='50' cy='50' r='12' fill='%23ffffff'/><path d='M50 42 L53 50 L60 50 L54 54 L56 62 L50 57 L44 62 L46 54 L40 50 L47 50 Z' fill='%23dc2626'/></svg>";

        const photoContent = (state.showPhotoBox && state.photoDataUrl) ?
            `<img src="${state.photoDataUrl}" alt="Photo" class="w-full h-full object-cover">` :
            `<div class="text-center p-2 text-slate-400 text-[11px] leading-tight"><span>រូបថត ៤x៦<br>ឬ ត្រាសាលា</span></div>`;

        const photoBoxStyle = state.showPhotoBox ? '' : 'display: none !important;';

        return `
            <div class="certificate-paper relative bg-white text-slate-900 overflow-hidden select-none batch-print-page" style="width: 1050px; height: 742px; background: white;">
                <div class="absolute inset-0 pointer-events-none z-0 p-3">
                    ${frameContent}
                </div>
                <div class="relative z-10 h-full p-10 flex flex-col justify-between text-slate-900 font-battambang">
                    <div class="grid grid-cols-12 items-start pt-2">
                        <div class="col-span-5 flex flex-col items-center text-center header-text-theme" style="color: ${state.themeColor}; ${getTransformStyle('cert-header-left')}">
                            <div class="w-16 h-16 mb-1 flex items-center justify-center">
                                <img src="${logoSrc}" alt="Emblem" class="max-w-full max-h-full object-contain">
                            </div>
                            <div class="font-moul text-[15px] leading-snug">${formatText(state.ministry)}</div>
                            <div class="font-moul text-[13.5px] leading-snug mt-0.5">${formatText(state.office)}</div>
                            <div class="font-moul text-[13.5px] leading-snug mt-0.5">${formatText(state.school)}</div>
                        </div>
                        <div class="col-span-2"></div>
                        <div class="col-span-5 flex flex-col items-center text-center header-text-theme" style="color: ${state.themeColor}; ${getTransformStyle('cert-header-right')}">
                            <div class="font-moul text-[15px] leading-snug">ព្រះរាជាណាចក្រកម្ពុជា</div>
                            <div class="font-moul text-[14px] leading-snug mt-1">ជាតិ សាសនា ព្រះមហាក្សត្រ</div>
                            <div class="w-36 h-5 my-1">
                                <svg viewBox="0 0 160 20" fill="currentColor" class="w-full h-full">
                                    <path d="M0,10 L50,10 C55,10 60,5 65,5 C70,5 72,15 80,10 C88,15 90,5 95,5 C100,5 105,10 110,10 L160,10 M75,10 C75,7 80,4 80,1 C80,4 85,7 85,10 C85,13 80,16 80,19 C80,16 75,13 75,10 Z"/>
                                    <circle cx="45" cy="10" r="2.5"/><circle cx="115" cy="10" r="2.5"/>
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div class="text-center my-auto py-2 flex flex-col items-center justify-center">
                        <h2 class="font-moul text-[44px] tracking-wide leading-none mb-3 drop-shadow-sm" style="color: ${state.titleColor}; font-size: ${state.titleSize}px; ${getTransformStyle('cert-title')}">
                            បណ្ណសរសើរ
                        </h2>
                        <div class="font-moul text-[21px] mb-4 leading-relaxed" style="color: ${state.accentColor}; ${getTransformStyle('cert-principal-title')}">
                            ${formatText(state.principalTitle)}
                        </div>
                        <div class="text-[18.5px] text-slate-900 leading-[2.1] max-w-[920px] text-center px-4 font-battambang" style="font-size: ${state.fontSize}px; ${getTransformStyle('cert-body-paragraph')}">
                            សូមសរសើរចំពោះសិស្សឈ្មោះ៖ 
                            <span class="font-bold px-1 font-moul text-[19px]" style="color: ${state.themeColor}">${studentName}</span> 
                            ភេទ <span class="font-bold px-1" style="color: ${state.themeColor}">${gender}</span> 
                            កើតនៅថ្ងៃទី <span class="font-bold px-1" style="color: ${state.themeColor}">${dobDay}</span> 
                            ខែ <span class="font-bold px-1" style="color: ${state.themeColor}">${dobMonth}</span> 
                            ឆ្នាំ <span class="font-bold px-1" style="color: ${state.themeColor}">${dobYear}</span> 
                            រៀនថ្នាក់ទី <span class="font-bold px-1" style="color: ${state.themeColor}">${grade}</span><br>
                            ដែលទទួលបានលទ្ធផលល្អក្នុងការសិក្សានិងទទួលបានចំណាត់ថ្នាក់លេខ 
                            <span class="font-bold px-1 text-[21px]" style="color: ${state.titleColor}">${rank}</span> 
                            <span class="font-bold px-1" style="color: ${state.titleColor}">${formatText(state.period)}</span> 
                            ឆ្នាំសិក្សា <span class="font-bold text-slate-900 px-1">${formatText(state.academicYear)}</span> ។<br>
                            <span class="text-[17.5px]">បណ្ណសរសើរនេះប្រគល់ជូនសាមីខ្លួនប្រើប្រាស់តាមការដែលអាចប្រើបាន ។</span>
                        </div>
                    </div>

                    <div class="grid grid-cols-12 items-end pt-4 pb-2 text-[14.5px]">
                        <div class="col-span-4 text-center flex flex-col items-center justify-end header-text-theme" style="color: ${state.themeColor}; ${getTransformStyle('cert-sign-left')}">
                            <div class="text-[12.5px] leading-tight text-slate-800 mb-0.5 date-fixed-print">${formatText(state.lunarDate)}</div>
                            <div class="text-[13px] leading-tight text-slate-900 mb-2 font-medium date-fixed-print">${formatText(state.solarDate)}</div>
                            <div class="font-moul text-[14px] mb-1">បានឃើញ និងឯកភាព</div>
                            <div class="font-moul text-[15px] min-h-[65px] flex items-end justify-center">${formatText(state.principalName)}</div>
                        </div>
                        <div class="col-span-4 flex items-center justify-center">
                            <div class="w-24 h-32 border-2 border-slate-400 bg-slate-50/50 flex flex-col items-center justify-center relative shadow-inner overflow-hidden rounded-sm" style="${photoBoxStyle} ${getTransformStyle('cert-photo-container')}">
                                ${photoContent}
                            </div>
                        </div>
                        <div class="col-span-4 text-center flex flex-col items-center justify-end header-text-theme" style="color: ${state.themeColor}; ${getTransformStyle('cert-sign-right')}">
                            <div class="text-[12.5px] leading-tight text-slate-800 mb-0.5 date-fixed-print">${formatText(state.lunarDate)}</div>
                            <div class="text-[13px] leading-tight text-slate-900 mb-2 font-medium date-fixed-print">${formatText(state.solarDate)}</div>
                            <div class="font-moul text-[14px] mb-1">គ្រូបន្ទុកថ្នាក់</div>
                            <div class="font-moul text-[15px] min-h-[65px] flex items-end justify-center">${formatText(state.teacherName)}</div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    // --- BATCH MULTI-PAGE PRINTING FUNCTION ---
    function printAllBatch() {
        if (!batchStudents || batchStudents.length === 0) {
            alert('សូមបញ្ចូលសិស្សយ៉ាងហោចណាស់ ១ នាក់នៅក្នុងបញ្ជី!');
            return;
        }

        const batchPrintContainer = document.getElementById('batch-print-container');
        batchPrintContainer.innerHTML = '';

        batchStudents.forEach(student => {
            const wrapper = document.createElement('div');
            wrapper.innerHTML = generateStudentCertificateMarkup(student);
            batchPrintContainer.appendChild(wrapper.firstElementChild);
        });

        document.body.classList.add('printing-batch');

        setTimeout(() => {
            window.print();

            setTimeout(() => {
                document.body.classList.remove('printing-batch');
                batchPrintContainer.innerHTML = '';
            }, 1000);
        }, 300);
    }

    // --- BATCH BULK PDF EXPORT FUNCTION ---
    async function exportBulkPdf() {
        if (!batchStudents || batchStudents.length === 0) {
            alert('សូមបញ្ចូលសិស្សយ៉ាងហោចណាស់ ១ នាក់នៅក្នុងបញ្ជី!');
            return;
        }

        const btn = document.getElementById('btn-export-bulk-pdf');
        const originalText = btn ? btn.innerHTML : '';
        if (btn) {
            btn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> កំពុងបង្កើត PDF...`;
            btn.disabled = true;
        }

        const tempContainer = document.createElement('div');
        tempContainer.style.position = 'fixed';
        tempContainer.style.left = '-9999px';
        tempContainer.style.top = '-9999px';
        document.body.appendChild(tempContainer);

        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF({
            orientation: 'landscape',
            unit: 'mm',
            format: 'a4'
        });

        try {
            for (let i = 0; i < batchStudents.length; i++) {
                const student = batchStudents[i];
                tempContainer.innerHTML = generateStudentCertificateMarkup(student);
                const el = tempContainer.firstElementChild;

                const canvas = await html2canvas(el, {
                    scale: 2.2,
                    useCORS: true,
                    allowTaint: true,
                    backgroundColor: '#ffffff'
                });

                const imgData = canvas.toDataURL('image/jpeg', 0.95);

                if (i > 0) {
                    pdf.addPage('a4', 'landscape');
                }

                pdf.addImage(imgData, 'JPEG', 0, 0, 297, 210);
            }

            pdf.save(`បណ្ណសរសើរ_សរុប_${batchStudents.length}នាក់.pdf`);
        } catch (err) {
            console.error('Export Bulk PDF failed:', err);
            alert('មានបញ្ហាក្នុងការបង្កើត Bulk PDF សូមព្យាយាមម្តងទៀត!');
        } finally {
            document.body.removeChild(tempContainer);
            if (btn) {
                btn.innerHTML = originalText;
                btn.disabled = false;
            }
        }
    }

    // --- WORD EXPORT FUNCTIONS ---
    function generateWordCertificateHtml(student) {
        const studentName = student ? student.name : state.studentName;
        const gender = student ? student.gender : state.gender;
        const dobDay = formatText(student ? student.dobDay : state.dobDay);
        const dobMonth = student ? student.dobMonth : state.dobMonth;
        const dobYear = formatText(student ? student.dobYear : state.dobYear);
        const grade = formatText(student ? student.grade : state.grade);
        const rank = formatText(student ? student.rank : state.rank);

        const logoSrc = state.logoDataUrl || "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='50' r='45' fill='%23153285' stroke='%23d97706' stroke-width='3'/><path d='M50 15 L58 35 L80 35 L62 48 L69 70 L50 56 L31 70 L38 48 L20 35 L42 35 Z' fill='%23fbbf24'/><circle cx='50' cy='50' r='12' fill='%23ffffff'/><path d='M50 42 L53 50 L60 50 L54 54 L56 62 L50 57 L44 62 L46 54 L40 50 L47 50 Z' fill='%23dc2626'/></svg>";

        const photoContent = (state.showPhotoBox && state.photoDataUrl) ?
            `<img src="${state.photoDataUrl}" alt="Photo" style="width: 90px; height: 120px; object-fit: cover; border: 1px solid #94a3b8;" />` :
            `<div style="width: 90px; height: 120px; border: 1px dashed #94a3b8; background-color: #f8fafc; display: inline-block; vertical-align: middle; text-align: center; font-size: 11px; color: #64748b; padding-top: 40px; box-sizing: border-box;">រូបថត ៤x៦<br>ឬ ត្រាសាលា</div>`;

        const photoBoxStyle = state.showPhotoBox ? '' : 'display: none !important;';

        const themeColor = state.themeColor || '#153285';
        const titleColor = state.titleColor || '#e53e3e';
        const accentColor = state.accentColor || '#d97706';
        const fontSize = state.fontSize || 18.5;
        const titleSize = state.titleSize || 44;

        return `
        <div style="page-break-after: always; width: 100%; box-sizing: border-box; background: #ffffff; padding: 10px;">
            <table class="cert-table-frame" style="width: 100%; border: 6px double ${themeColor}; background: #ffffff; padding: 25px; border-collapse: collapse;">
                <tr>
                    <td style="padding: 10px;">
                        <!-- Header Table -->
                        <table style="width: 100%; border-collapse: collapse;">
                            <tr>
                                <!-- Left Header -->
                                <td style="width: 42%; text-align: center; vertical-align: top; color: ${themeColor}; font-family: 'Moul', 'Khmer OS Muol Light', serif;">
                                    <div style="margin-bottom: 5px;">
                                        <img src="${logoSrc}" style="width: 60px; height: 60px; object-fit: contain;" alt="Logo" />
                                    </div>
                                    <div style="font-size: 15px; line-height: 1.4;">${formatText(state.ministry)}</div>
                                    <div style="font-size: 13.5px; line-height: 1.4; margin-top: 2px;">${formatText(state.office)}</div>
                                    <div style="font-size: 13.5px; line-height: 1.4; margin-top: 2px;">${formatText(state.school)}</div>
                                </td>

                                <!-- Center Gap -->
                                <td style="width: 16%;"></td>

                                <!-- Right Header -->
                                <td style="width: 42%; text-align: center; vertical-align: top; color: ${themeColor}; font-family: 'Moul', 'Khmer OS Muol Light', serif;">
                                    <div style="font-size: 15px; line-height: 1.4;">ព្រះរាជាណាចក្រកម្ពុជា</div>
                                    <div style="font-size: 14px; line-height: 1.4; margin-top: 4px;">ជាតិ សាសនា ព្រះមហាក្សត្រ</div>
                                    <div style="margin-top: 6px; font-size: 13px; color: ${themeColor}; font-weight: bold;">
                                        ❖ ══════════════ ❖
                                    </div>
                                </td>
                            </tr>
                        </table>

                        <!-- Main Body -->
                        <div style="text-align: center; margin-top: 30px; margin-bottom: 30px;">
                            <h1 style="font-family: 'Moul', 'Khmer OS Muol Light', serif; font-size: ${titleSize}px; color: ${titleColor}; margin: 0 0 12px 0; font-weight: normal;">
                                បណ្ណសរសើរ
                            </h1>
                            <div style="font-family: 'Moul', 'Khmer OS Muol Light', serif; font-size: 21px; color: ${accentColor}; margin-bottom: 18px;">
                                ${formatText(state.principalTitle)}
                            </div>
                            <div style="font-family: 'Battambang', 'Khmer OS Battambang', sans-serif; font-size: ${fontSize}px; color: #0f172a; line-height: 2.3; max-width: 900px; margin: 0 auto; text-align: center;">
                                សូមសរសើរចំពោះសិស្សឈ្មោះ៖ 
                                <strong style="font-family: 'Moul', 'Khmer OS Muol Light', serif; color: ${themeColor}; font-size: 19px; padding: 0 4px;">${studentName}</strong> 
                                ភេទ <strong style="color: ${themeColor}; padding: 0 4px;">${gender}</strong> 
                                កើតនៅថ្ងៃទី <strong style="color: ${themeColor}; padding: 0 4px;">${dobDay}</strong> 
                                ខែ <strong style="color: ${themeColor}; padding: 0 4px;">${dobMonth}</strong> 
                                ឆ្នាំ <strong style="color: ${themeColor}; padding: 0 4px;">${dobYear}</strong> 
                                រៀនថ្នាក់ទី <strong style="color: ${themeColor}; padding: 0 4px;">${grade}</strong><br>
                                ដែលទទួលបានលទ្ធផលល្អក្នុងការសិក្សានិងទទួលបានចំណាត់ថ្នាក់លេខ 
                                <strong style="color: ${titleColor}; font-size: 21px; padding: 0 4px;">${rank}</strong> 
                                <strong style="color: ${titleColor}; padding: 0 4px;">${formatText(state.period)}</strong> 
                                ឆ្នាំសិក្សា <strong style="color: #0f172a; padding: 0 4px;">${formatText(state.academicYear)}</strong> ។<br>
                                <span style="font-size: 17.5px;">បណ្ណសរសើរនេះប្រគល់ជូនសាមីខ្លួនប្រើប្រាស់តាមការដែលអាចប្រើបាន ។</span>
                            </div>
                        </div>

                        <!-- Bottom Signatures Table -->
                        <table style="width: 100%; border-collapse: collapse; margin-top: 25px;">
                            <tr>
                                <!-- Left Signature -->
                                <td style="width: 38%; text-align: center; vertical-align: bottom; color: ${themeColor}; font-family: 'Moul', 'Khmer OS Muol Light', serif;">
                                    <div style="font-family: 'Battambang', sans-serif; font-size: 12.5px; color: #1e293b; margin-bottom: 2px;">${formatText(state.lunarDate)}</div>
                                    <div style="font-family: 'Battambang', sans-serif; font-size: 13px; color: #0f172a; font-weight: bold; margin-bottom: 8px;">${formatText(state.solarDate)}</div>
                                    <div style="font-size: 14px; margin-bottom: 4px;">បានឃើញ និងឯកភាព</div>
                                    <div style="font-size: 15px; margin-top: 45px;">${formatText(state.principalName)}</div>
                                </td>

                                <!-- Center Photo Box -->
                                <td style="width: 24%; text-align: center; vertical-align: middle;">
                                    <div style="${photoBoxStyle} display: inline-block;">
                                        ${photoContent}
                                    </div>
                                </td>

                                <!-- Right Signature -->
                                <td style="width: 38%; text-align: center; vertical-align: bottom; color: ${themeColor}; font-family: 'Moul', 'Khmer OS Muol Light', serif;">
                                    <div style="font-family: 'Battambang', sans-serif; font-size: 12.5px; color: #1e293b; margin-bottom: 2px;">${formatText(state.lunarDate)}</div>
                                    <div style="font-family: 'Battambang', sans-serif; font-size: 13px; color: #0f172a; font-weight: bold; margin-bottom: 8px;">${formatText(state.solarDate)}</div>
                                    <div style="font-size: 14px; margin-bottom: 4px;">គ្រូបន្ទុកថ្នាក់</div>
                                    <div style="font-size: 15px; margin-top: 45px;">${formatText(state.teacherName)}</div>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </div>
        `;
    }

    function exportBulkWord() {
        if (!batchStudents || batchStudents.length === 0) {
            alert('សូមបញ្ចូលសិស្សយ៉ាងហោចណាស់ ១ នាក់នៅក្នុងបញ្ជី!');
            return;
        }

        const btn = document.getElementById('btn-export-bulk-word');
        const originalText = btn ? btn.innerHTML : '';
        if (btn) {
            btn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> កំពុងបង្កើត Word ទាំងអស់...`;
            btn.disabled = true;
        }

        try {
            let allCertsHtml = '';
            batchStudents.forEach((student) => {
                allCertsHtml += generateWordCertificateHtml(student);
            });

            const schoolName = state.school ? state.school.replace(/\s+/g, '_') : 'សាលា';
            const fullDocHtml = `
            <!DOCTYPE html>
            <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40">
            <head>
            <meta charset="utf-8">
            <title>បណ្ណសរសើរ_ទាំងអស់</title>
            <!--[if gte mso 9]>
            <xml>
             <w:WordDocument>
              <w:View>Print</w:View>
              <w:Zoom>100</w:Zoom>
              <w:DoNotOptimizeForBrowser/>
             </w:WordDocument>
            </xml>
            <![endif]-->
            <style>
              @import url('https://fonts.googleapis.com/css2?family=Battambang:wght@400;700&family=Kantumruy+Pro:wght@400;500;600;700&family=Moul&display=swap');
              @page WordSection1 {
                size: 297mm 210mm;
                margin: 8mm 8mm 8mm 8mm;
                mso-page-orientation: landscape;
              }
              div.WordSection1 {
                page: WordSection1;
              }
              body {
                font-family: 'Kantumruy Pro', 'Battambang', sans-serif;
                background-color: #ffffff;
              }
            </style>
            </head>
            <body>
            <div class="WordSection1">
                ${allCertsHtml}
            </div>
            </body>
            </html>`;

            const blob = new Blob(['\ufeff' + fullDocHtml], { type: 'application/msword;charset=utf-8' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `បណ្ណសរសើរ_ទាំងអស់_${batchStudents.length}នាក់_${schoolName}.doc`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        } catch (err) {
            console.error('Export Bulk Word failed:', err);
            alert('មានបញ្ហាក្នុងការបង្កើត Bulk Word សូមព្យាយាមម្តងទៀត!');
        } finally {
            if (btn) {
                btn.innerHTML = originalText;
                btn.disabled = false;
            }
        }
    }

    // --- Drag & Drop Interactive Positioning System ---
    let activeDragEl = null;
    let dragStartX = 0;
    let dragStartY = 0;
    let initialOffsetX = 0;
    let initialOffsetY = 0;

    function initDraggableElements() {
        document.querySelectorAll('.draggable-element').forEach(el => {
            if (el.dataset.dragInitialized) return;
            el.dataset.dragInitialized = 'true';

            el.addEventListener('pointerdown', (e) => {
                if (e.target.tagName === 'INPUT' || e.target.tagName === 'BUTTON' || e.target.tagName === 'SELECT') return;

                activeDragEl = el;
                el.classList.add('is-dragging');
                el.setPointerCapture(e.pointerId);

                dragStartX = e.clientX;
                dragStartY = e.clientY;

                const currentOffset = state.elementOffsets[el.id] || { x: 0, y: 0 };
                initialOffsetX = currentOffset.x;
                initialOffsetY = currentOffset.y;
            });

            el.addEventListener('pointermove', (e) => {
                if (!activeDragEl || activeDragEl !== el) return;

                const zoomFactor = currentZoom / 100;
                const deltaX = (e.clientX - dragStartX) / zoomFactor;
                const deltaY = (e.clientY - dragStartY) / zoomFactor;

                const newX = Math.round(initialOffsetX + deltaX);
                const newY = Math.round(initialOffsetY + deltaY);

                state.elementOffsets[el.id] = { x: newX, y: newY };
                el.style.transform = `translate(${newX}px, ${newY}px)`;
            });

            const endDrag = (e) => {
                if (activeDragEl === el) {
                    el.classList.remove('is-dragging');
                    try { el.releasePointerCapture(e.pointerId); } catch (err) { }
                    activeDragEl = null;
                }
            };

            el.addEventListener('pointerup', endDrag);
            el.addEventListener('pointercancel', endDrag);
        });
    }

    // Reset Layout Positions Button
    const btnResetPositions = document.getElementById('btn-reset-positions');
    if (btnResetPositions) {
        btnResetPositions.addEventListener('click', () => {
            state.elementOffsets = {};
            document.querySelectorAll('.draggable-element').forEach(el => {
                el.style.transform = 'none';
            });
        });
    }

    // --- Update Canvas View ---
    function updateCertificateCanvas() {
        certElements.ministry.textContent = formatText(state.ministry);
        certElements.office.textContent = formatText(state.office);
        certElements.school.textContent = formatText(state.school);
        certElements.principalTitle.textContent = formatText(state.principalTitle);
        certElements.studentName.textContent = state.studentName;
        certElements.gender.textContent = state.gender;
        certElements.dobDay.textContent = formatText(state.dobDay);
        certElements.dobMonth.textContent = state.dobMonth;
        certElements.dobYear.textContent = formatText(state.dobYear);
        certElements.grade.textContent = formatText(state.grade);
        certElements.rank.textContent = formatText(state.rank);
        certElements.period.textContent = formatText(state.period);
        certElements.academicYear.textContent = formatText(state.academicYear);

        certElements.lunarLeft.textContent = formatText(state.lunarDate);
        certElements.lunarRight.textContent = formatText(state.lunarDate);
        certElements.solarLeft.textContent = formatText(state.solarDate);
        certElements.solarRight.textContent = formatText(state.solarDate);

        certElements.principalSignLabel.textContent = formatText(state.principalName);
        certElements.teacherName.textContent = formatText(state.teacherName);

        certElements.title.style.color = state.titleColor;
        certElements.title.style.fontSize = `${state.titleSize}px`;
        certElements.principalTitle.style.color = state.accentColor;
        certElements.bodyParagraph.style.fontSize = `${state.fontSize}px`;

        if (state.customFrameDataUrl) {
            certElements.frameSvg.classList.add('hidden');
            certElements.customFrameImg.src = state.customFrameDataUrl;
            certElements.customFrameImg.classList.remove('hidden');
            if (btnRemoveCustomFrame) btnRemoveCustomFrame.classList.remove('hidden');
        } else {
            certElements.customFrameImg.classList.add('hidden');
            certElements.frameSvg.classList.remove('hidden');
            if (btnRemoveCustomFrame) btnRemoveCustomFrame.classList.add('hidden');

            const svgMarkup = frameTemplates[state.framePreset] || frameTemplates['frame-kbach'];
            certElements.frameSvg.innerHTML = svgMarkup;
        }

        document.querySelectorAll('.border-svg-theme').forEach(el => {
            el.style.color = state.themeColor;
        });
        document.querySelectorAll('.header-text-theme').forEach(el => {
            el.style.color = state.themeColor;
        });

        if (state.showPhotoBox) {
            certElements.photoContainer.style.display = 'flex';
            if (state.photoDataUrl) {
                certElements.photoImg.src = state.photoDataUrl;
                certElements.photoImg.classList.remove('hidden');
                certElements.photoPlaceholder.classList.add('hidden');
            } else {
                certElements.photoImg.classList.add('hidden');
                certElements.photoPlaceholder.classList.remove('hidden');
            }
        } else {
            certElements.photoContainer.style.display = 'none';
        }

        if (state.logoDataUrl) {
            certElements.logoImg.src = state.logoDataUrl;
        }

        // Apply any saved drag offsets
        document.querySelectorAll('.draggable-element').forEach(el => {
            const offset = state.elementOffsets ? state.elementOffsets[el.id] : null;
            if (offset && (offset.x !== 0 || offset.y !== 0)) {
                el.style.transform = `translate(${offset.x}px, ${offset.y}px)`;
            } else {
                el.style.transform = 'none';
            }
        });
    }

    // --- Input Event Listeners ---
    Object.keys(inputs).forEach(key => {
        const inputEl = inputs[key];
        if (!inputEl) return;

        const eventName = (inputEl.type === 'checkbox' || inputEl.tagName === 'SELECT' || inputEl.type === 'color' || inputEl.type === 'range') ? 'change' : 'input';

        inputEl.addEventListener(eventName, () => {
            if (key === 'autoKhmerNum') {
                state.autoKhmerNum = inputEl.checked;
            } else if (key === 'togglePhotoBox') {
                state.showPhotoBox = inputEl.checked;
            } else if (key === 'fontSize') {
                state.fontSize = parseFloat(inputEl.value);
                document.getElementById('font-size-val').textContent = `${state.fontSize}px`;
            } else if (key === 'titleSize') {
                state.titleSize = parseInt(inputEl.value);
                document.getElementById('title-size-val').textContent = `${state.titleSize}px`;
            } else {
                state[key] = inputEl.value;
            }
            updateCertificateCanvas();
        });
    });

    // File Uploads
    if (inputs.photoFile) {
        inputs.photoFile.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    state.photoDataUrl = event.target.result;
                    updateCertificateCanvas();
                };
                reader.readAsDataURL(file);
            }
        });
    }

    const btnRemovePhoto = document.getElementById('btn-remove-photo');
    if (btnRemovePhoto) {
        btnRemovePhoto.addEventListener('click', () => {
            state.photoDataUrl = null;
            if (inputs.photoFile) inputs.photoFile.value = '';
            updateCertificateCanvas();
        });
    }

    if (inputs.logoFile) {
        inputs.logoFile.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    state.logoDataUrl = event.target.result;
                    updateCertificateCanvas();
                };
                reader.readAsDataURL(file);
            }
        });
    }

    const btnResetLogo = document.getElementById('btn-reset-logo');
    if (btnResetLogo) {
        btnResetLogo.addEventListener('click', () => {
            state.logoDataUrl = null;
            if (inputs.logoFile) inputs.logoFile.value = '';
            certElements.logoImg.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='50' r='45' fill='%23153285' stroke='%23d97706' stroke-width='3'/><path d='M50 15 L58 35 L80 35 L62 48 L69 70 L50 56 L31 70 L38 48 L20 35 L42 35 Z' fill='%23fbbf24'/><circle cx='50' cy='50' r='12' fill='%23ffffff'/><path d='M50 42 L53 50 L60 50 L54 54 L56 62 L50 57 L44 62 L46 54 L40 50 L47 50 Z' fill='%23dc2626'/></svg>";
        });
    }

    // Tab Navigation
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.tab-btn').forEach(b => {
                b.classList.remove('active', 'text-amber-400', 'bg-slate-800');
                b.classList.add('text-slate-400');
            });
            document.querySelectorAll('.tab-content').forEach(tc => tc.classList.add('hidden'));

            btn.classList.add('active', 'text-amber-400', 'bg-slate-800');
            btn.classList.remove('text-slate-400');

            const targetTab = btn.getAttribute('data-tab');
            document.getElementById(targetTab).classList.remove('hidden');
        });
    });

    // Theme Preset Buttons
    document.querySelectorAll('.theme-preset-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.theme-preset-btn').forEach(b => b.classList.remove('active', 'border-amber-400'));
            btn.classList.add('active', 'border-amber-400');

            const color = btn.getAttribute('data-color');
            state.themeColor = color;
            updateCertificateCanvas();
        });
    });

    // Frame Selection Buttons
    document.querySelectorAll('.frame-preset-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.frame-preset-btn').forEach(b => {
                b.classList.remove('active', 'border-amber-400');
                b.classList.add('border-slate-700');
            });
            btn.classList.add('active', 'border-amber-400');
            btn.classList.remove('border-slate-700');

            const frameKey = btn.getAttribute('data-frame');
            state.framePreset = frameKey;
            state.customFrameDataUrl = null;
            if (inputFrameFile) inputFrameFile.value = '';
            updateCertificateCanvas();
        });
    });

    if (inputFrameFile) {
        inputFrameFile.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    state.customFrameDataUrl = event.target.result;
                    updateCertificateCanvas();
                };
                reader.readAsDataURL(file);
            }
        });
    }

    if (btnRemoveCustomFrame) {
        btnRemoveCustomFrame.addEventListener('click', () => {
            state.customFrameDataUrl = null;
            if (inputFrameFile) inputFrameFile.value = '';
            updateCertificateCanvas();
        });
    }

    // Zoom & Canvas Scaling
    let currentZoom = 100;
    const certWrapper = document.getElementById('certificate-wrapper');
    const zoomLevelText = document.getElementById('zoom-level');

    function setZoom(zoom) {
        currentZoom = Math.min(Math.max(zoom, 50), 160);
        if (certWrapper) certWrapper.style.transform = `scale(${currentZoom / 100})`;
        if (zoomLevelText) zoomLevelText.textContent = `${currentZoom}%`;
    }

    const btnZoomIn = document.getElementById('btn-zoom-in');
    const btnZoomOut = document.getElementById('btn-zoom-out');
    const btnZoomReset = document.getElementById('btn-zoom-reset');

    if (btnZoomIn) btnZoomIn.addEventListener('click', () => setZoom(currentZoom + 10));
    if (btnZoomOut) btnZoomOut.addEventListener('click', () => setZoom(currentZoom - 10));
    if (btnZoomReset) btnZoomReset.addEventListener('click', () => setZoom(100));

    function autoFitCanvas() {
        const mainEl = document.querySelector('main');
        if (!mainEl) return;
        const workspaceWidth = mainEl.clientWidth - 48;
        if (workspaceWidth < 1050) {
            const fitScale = Math.floor((workspaceWidth / 1050) * 100);
            setZoom(fitScale);
        } else {
            setZoom(100);
        }
    }
    window.addEventListener('resize', autoFitCanvas);
    autoFitCanvas();

    // --- Batch Student Table Logic ---
    function renderBatchTable() {
        const tbody = document.getElementById('batch-table-body');
        if (!tbody) return;
        tbody.innerHTML = '';

        batchStudents.forEach((student, idx) => {
            const tr = document.createElement('tr');
            tr.className = `hover:bg-slate-800/80 transition-colors ${idx === currentBatchIndex ? 'bg-amber-950/40 border-l-4 border-amber-500' : ''}`;
            tr.innerHTML = `
                <td class="p-1.5 text-center font-bold text-slate-400">${idx + 1}</td>
                <td class="p-1">
                    <input type="text" class="batch-field batch-name font-bold text-blue-300 bg-slate-900 border border-slate-700/80 focus:border-amber-500 rounded px-1.5 py-1 text-xs w-full outline-none" value="${student.name}" data-index="${idx}" data-field="name">
                </td>
                <td class="p-1">
                    <select class="batch-field batch-gender bg-slate-900 border border-slate-700/80 focus:border-amber-500 rounded px-1 py-1 text-xs w-full text-slate-200 outline-none" data-index="${idx}" data-field="gender">
                        <option value="ប្រុស" ${student.gender === 'ប្រុស' ? 'selected' : ''}>ប្រុស</option>
                        <option value="ស្រី" ${student.gender === 'ស្រី' ? 'selected' : ''}>ស្រី</option>
                    </select>
                </td>
                <td class="p-1">
                    <div class="flex gap-1">
                        <input type="text" class="batch-field batch-dobDay bg-slate-900 border border-slate-700/80 focus:border-amber-500 rounded px-1 py-1 text-xs w-8 text-center text-slate-200 outline-none" value="${student.dobDay}" data-index="${idx}" data-field="dobDay" title="ថ្ងៃកើត">
                        <input type="text" class="batch-field batch-dobMonth bg-slate-900 border border-slate-700/80 focus:border-amber-500 rounded px-1 py-1 text-xs flex-1 text-center text-slate-200 outline-none" value="${student.dobMonth}" data-index="${idx}" data-field="dobMonth" title="ខែកើត">
                        <input type="text" class="batch-field batch-dobYear bg-slate-900 border border-slate-700/80 focus:border-amber-500 rounded px-1 py-1 text-xs w-12 text-center text-slate-200 outline-none" value="${student.dobYear}" data-index="${idx}" data-field="dobYear" title="ឆ្នាំកើត">
                    </div>
                </td>
                <td class="p-1">
                    <input type="text" class="batch-field batch-grade bg-slate-900 border border-slate-700/80 focus:border-amber-500 rounded px-1 py-1 text-xs w-full text-center text-slate-200 outline-none" value="${student.grade}" data-index="${idx}" data-field="grade">
                </td>
                <td class="p-1">
                    <input type="text" class="batch-field batch-rank font-bold text-red-400 bg-slate-900 border border-slate-700/80 focus:border-amber-500 rounded px-1 py-1 text-xs w-full text-center outline-none" value="${student.rank}" data-index="${idx}" data-field="rank">
                </td>
                <td class="p-1 text-center">
                    <div class="flex items-center justify-center gap-1">
                        <button type="button" class="btn-preview-student p-1.5 text-slate-400 hover:text-amber-400 transition rounded" data-index="${idx}" title="មើលបណ្ណសិស្សនេះ">
                            <i class="fa-solid fa-eye text-xs"></i>
                        </button>
                        <button type="button" class="btn-delete-student p-1.5 text-slate-400 hover:text-rose-400 transition rounded" data-index="${idx}" title="លុបសិស្សនេះ">
                            <i class="fa-solid fa-trash text-xs"></i>
                        </button>
                    </div>
                </td>
            `;
            tbody.appendChild(tr);
        });

        const curIdxEl = document.getElementById('batch-current-index');
        const totCntEl = document.getElementById('batch-total-count');
        if (curIdxEl) curIdxEl.textContent = batchStudents.length ? currentBatchIndex + 1 : 0;
        if (totCntEl) totCntEl.textContent = batchStudents.length;

        document.querySelectorAll('.batch-field').forEach(input => {
            const eventType = input.tagName === 'SELECT' ? 'change' : 'input';
            input.addEventListener(eventType, () => {
                const idx = parseInt(input.getAttribute('data-index'));
                const field = input.getAttribute('data-field');
                if (batchStudents[idx]) {
                    batchStudents[idx][field] = input.value;
                    if (idx === currentBatchIndex) {
                        syncSingleFormWithBatch(idx);
                        updateCertificateCanvas();
                    }
                }
            });

            input.addEventListener('focus', () => {
                const idx = parseInt(input.getAttribute('data-index'));
                if (idx !== currentBatchIndex) {
                    loadBatchStudent(idx, false);
                }
            });
        });

        document.querySelectorAll('.btn-preview-student').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const idx = parseInt(btn.getAttribute('data-index'));
                loadBatchStudent(idx);
            });
        });

        document.querySelectorAll('.btn-delete-student').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const idx = parseInt(btn.getAttribute('data-index'));
                batchStudents.splice(idx, 1);
                if (currentBatchIndex >= batchStudents.length) {
                    currentBatchIndex = Math.max(0, batchStudents.length - 1);
                }
                renderBatchTable();
                if (batchStudents.length > 0) {
                    loadBatchStudent(currentBatchIndex);
                }
            });
        });

        updateCountBadges();
    }

    function syncSingleFormWithBatch(idx) {
        if (!batchStudents[idx]) return;
        const st = batchStudents[idx];

        state.studentName = st.name;
        state.gender = st.gender;
        state.dobDay = st.dobDay;
        state.dobMonth = st.dobMonth;
        state.dobYear = st.dobYear;
        state.grade = st.grade;
        state.rank = st.rank;

        if (inputs.studentName) inputs.studentName.value = st.name;
        if (inputs.gender) inputs.gender.value = st.gender;
        if (inputs.dobDay) inputs.dobDay.value = st.dobDay;
        if (inputs.dobMonth) inputs.dobMonth.value = st.dobMonth;
        if (inputs.dobYear) inputs.dobYear.value = st.dobYear;
        if (inputs.grade) inputs.grade.value = st.grade;
        if (inputs.rank) inputs.rank.value = st.rank;
    }

    function loadBatchStudent(idx, reRender = true) {
        if (idx < 0 || idx >= batchStudents.length) return;
        currentBatchIndex = idx;
        syncSingleFormWithBatch(idx);
        if (reRender) {
            renderBatchTable();
        } else {
            document.querySelectorAll('#batch-table-body tr').forEach((tr, i) => {
                if (i === idx) {
                    tr.classList.add('bg-amber-950/40', 'border-l-4', 'border-amber-500');
                } else {
                    tr.classList.remove('bg-amber-950/40', 'border-l-4', 'border-amber-500');
                }
            });
            const curIdxEl = document.getElementById('batch-current-index');
            if (curIdxEl) curIdxEl.textContent = idx + 1;
        }
        updateCertificateCanvas();
    }

    const btnAddBatchRow = document.getElementById('btn-add-batch-row');
    if (btnAddBatchRow) {
        btnAddBatchRow.addEventListener('click', () => {
            const newStudent = {
                name: `សិស្ស ថ្មី ${batchStudents.length + 1}`,
                gender: 'ប្រុស',
                dobDay: '០១',
                dobMonth: 'មករា',
                dobYear: '២០១៤',
                grade: state.grade || '៧"C"',
                rank: `${batchStudents.length + 1}`
            };
            batchStudents.push(newStudent);
            loadBatchStudent(batchStudents.length - 1);
        });
    }

    const btnLoadDemoBatch = document.getElementById('btn-load-demo-batch');
    if (btnLoadDemoBatch) {
        btnLoadDemoBatch.addEventListener('click', () => {
            batchStudents = [
                { name: 'សស់ សៀងហេង', gender: 'ប្រុស', dobDay: '២៤', dobMonth: 'មេសា', dobYear: '២០១៤', grade: '៧"C"', rank: '៥' },
                { name: 'កែវ សុភា', gender: 'ស្រី', dobDay: '១៥', dobMonth: 'មករា', dobYear: '២០១៤', grade: '៧"C"', rank: '១' },
                { name: 'ចាន់ វិចិត្រ', gender: 'ប្រុស', dobDay: '០៨', dobMonth: 'កុម្ភៈ', dobYear: '២០១៤', grade: '៧"C"', rank: '២' },
                { name: 'ហេង សុវណ្ណារី', gender: 'ស្រី', dobDay: '៣០', dobMonth: 'តុលា', dobYear: '២០១៤', grade: '៧"C"', rank: '៣' },
                { name: 'លី ប៊ុនធឿន', gender: 'ប្រុស', dobDay: '១២', dobMonth: 'កក្កដា', dobYear: '២០១៤', grade: '៧"C"', rank: '៤' }
            ];
            loadBatchStudent(0);
        });
    }

    const btnBatchPrev = document.getElementById('btn-batch-prev');
    if (btnBatchPrev) {
        btnBatchPrev.addEventListener('click', () => {
            if (currentBatchIndex > 0) loadBatchStudent(currentBatchIndex - 1);
        });
    }

    const btnBatchNext = document.getElementById('btn-batch-next');
    if (btnBatchNext) {
        btnBatchNext.addEventListener('click', () => {
            if (currentBatchIndex < batchStudents.length - 1) loadBatchStudent(currentBatchIndex + 1);
        });
    }

    // Reset to Sample Data
    const btnSampleData = document.getElementById('btn-sample-data');
    if (btnSampleData) {
        btnSampleData.addEventListener('click', () => {
            state = { ...defaultData, elementOffsets: {} };
            Object.keys(inputs).forEach(key => {
                if (inputs[key] && key !== 'photoFile' && key !== 'logoFile') {
                    if (inputs[key].type === 'checkbox') {
                        inputs[key].checked = state[key];
                    } else {
                        inputs[key].value = state[key];
                    }
                }
            });
            document.querySelectorAll('.draggable-element').forEach(el => {
                el.style.transform = 'none';
            });
            updateCertificateCanvas();
        });
    }

    // PNG Export Single
    const btnExportPng = document.getElementById('btn-export-png');
    if (btnExportPng) {
        btnExportPng.addEventListener('click', async () => {
            const originalText = btnExportPng.innerHTML;
            btnExportPng.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> កំពុងទាញយក...`;
            btnExportPng.disabled = true;

            const canvasEl = document.getElementById('certificate-canvas');
            const prevZoom = currentZoom;
            setZoom(100);

            try {
                const canvas = await html2canvas(canvasEl, {
                    scale: 3,
                    useCORS: true,
                    allowTaint: true,
                    backgroundColor: '#ffffff'
                });

                const link = document.createElement('a');
                link.download = `បណ្ណសរសើរ_${state.studentName.replace(/\s+/g, '_')}.png`;
                link.href = canvas.toDataURL('image/png', 1.0);
                link.click();
            } catch (err) {
                console.error('Export PNG failed:', err);
                alert('មានបញ្ហាក្នុងការទាញយករូបភាព សូមព្យាយាមម្តងទៀត!');
            } finally {
                setZoom(prevZoom);
                btnExportPng.innerHTML = originalText;
                btnExportPng.disabled = false;
            }
        });
    }

    // PDF Export Single
    const btnExportPdf = document.getElementById('btn-export-pdf');
    if (btnExportPdf) {
        btnExportPdf.addEventListener('click', async () => {
            const originalText = btnExportPdf.innerHTML;
            btnExportPdf.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> កំពុងបង្កើត PDF...`;
            btnExportPdf.disabled = true;

            const canvasEl = document.getElementById('certificate-canvas');
            const prevZoom = currentZoom;
            setZoom(100);

            try {
                const canvas = await html2canvas(canvasEl, {
                    scale: 2.5,
                    useCORS: true,
                    allowTaint: true,
                    backgroundColor: '#ffffff'
                });

                const imgData = canvas.toDataURL('image/jpeg', 0.95);
                const { jsPDF } = window.jspdf;
                const pdf = new jsPDF({
                    orientation: 'landscape',
                    unit: 'mm',
                    format: 'a4'
                });

                pdf.addImage(imgData, 'JPEG', 0, 0, 297, 210);
                pdf.save(`បណ្ណសរសើរ_${state.studentName.replace(/\s+/g, '_')}.pdf`);
            } catch (err) {
                console.error('Export PDF failed:', err);
                alert('មានបញ្ហាក្នុងការបង្កើត PDF សូមព្យាយាមម្តងទៀត!');
            } finally {
                setZoom(prevZoom);
                btnExportPdf.innerHTML = originalText;
                btnExportPdf.disabled = false;
            }
        });
    }

    // Single Word Export Button
    const btnExportWord = document.getElementById('btn-export-word');
    if (btnExportWord) {
        btnExportWord.addEventListener('click', () => {
            const originalText = btnExportWord.innerHTML;
            btnExportWord.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> កំពុងបង្កើត Word...`;
            btnExportWord.disabled = true;

            try {
                const certHtml = generateWordCertificateHtml(null);
                const fullDocHtml = `
                <!DOCTYPE html>
                <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40">
                <head>
                <meta charset="utf-8">
                <title>បណ្ណសរសើរ_${state.studentName}</title>
                <!--[if gte mso 9]>
                <xml>
                 <w:WordDocument>
                  <w:View>Print</w:View>
                  <w:Zoom>100</w:Zoom>
                  <w:DoNotOptimizeForBrowser/>
                 </w:WordDocument>
                </xml>
                <![endif]-->
                <style>
                  @import url('https://fonts.googleapis.com/css2?family=Battambang:wght@400;700&family=Kantumruy+Pro:wght@400;500;600;700&family=Moul&display=swap');
                  @page WordSection1 {
                    size: 297mm 210mm;
                    margin: 8mm 8mm 8mm 8mm;
                    mso-page-orientation: landscape;
                  }
                  div.WordSection1 {
                    page: WordSection1;
                  }
                  body {
                    font-family: 'Kantumruy Pro', 'Battambang', sans-serif;
                    background-color: #ffffff;
                  }
                </style>
                </head>
                <body>
                <div class="WordSection1">
                    ${certHtml}
                </div>
                </body>
                </html>`;

                const blob = new Blob(['\ufeff' + fullDocHtml], { type: 'application/msword;charset=utf-8' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `បណ្ណសរសើរ_${state.studentName.replace(/\s+/g, '_')}.doc`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
            } catch (err) {
                console.error('Export Word failed:', err);
                alert('មានបញ្ហាក្នុងការបង្កើត Word សូមព្យាយាមម្តងទៀត!');
            } finally {
                btnExportWord.innerHTML = originalText;
                btnExportWord.disabled = false;
            }
        });
    }

    // Print All Batch Button
    const btnPrintAll = document.getElementById('btn-print-all');
    if (btnPrintAll) {
        btnPrintAll.addEventListener('click', printAllBatch);
    }

    // Bulk PDF Export Button
    const btnExportBulkPdf = document.getElementById('btn-export-bulk-pdf');
    if (btnExportBulkPdf) {
        btnExportBulkPdf.addEventListener('click', exportBulkPdf);
    }

    // Bulk Word Export Button
    const btnExportBulkWord = document.getElementById('btn-export-bulk-word');
    if (btnExportBulkWord) {
        btnExportBulkWord.addEventListener('click', exportBulkWord);
    }

    // --- TEMPLATE IMPORT / EXPORT & LOCAL STORAGE SYSTEM ---
    function syncFormWithState() {
        Object.keys(inputs).forEach(key => {
            if (inputs[key] && key !== 'photoFile' && key !== 'logoFile') {
                if (inputs[key].type === 'checkbox') {
                    inputs[key].checked = !!state[key];
                } else if (state[key] !== undefined) {
                    inputs[key].value = state[key];
                }
            }
        });
        const fontSizeVal = document.getElementById('font-size-val');
        const titleSizeVal = document.getElementById('title-size-val');
        if (fontSizeVal) fontSizeVal.textContent = `${state.fontSize || 18.5}px`;
        if (titleSizeVal) titleSizeVal.textContent = `${state.titleSize || 44}px`;
    }

    function exportTemplateJSON() {
        const exportData = {
            appName: 'KhmerSchoolCertificateGenerator',
            version: '1.0',
            exportedAt: new Date().toISOString(),
            state: state,
            batchStudents: batchStudents
        };
        const jsonStr = JSON.stringify(exportData, null, 2);
        const blob = new Blob([jsonStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        const schoolName = state.school ? state.school.replace(/\s+/g, '_') : 'គំរូបណ្ណ';
        a.download = `គំរូបណ្ណសរសើរ_${schoolName}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    function importTemplateJSON(file) {
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const parsed = JSON.parse(e.target.result);
                if (parsed.state) {
                    state = { ...defaultData, ...parsed.state };
                }
                if (parsed.batchStudents && Array.isArray(parsed.batchStudents)) {
                    batchStudents = parsed.batchStudents;
                    currentBatchIndex = 0;
                }
                syncFormWithState();
                renderBatchTable();
                updateCertificateCanvas();
                updateCountBadges();
                alert('បាននាំចូលគំរូ និងទិន្នន័យដោយជោគជ័យ!');
            } catch (err) {
                console.error('Import template failed:', err);
                alert('ឯកសារគំរូមិនត្រឹមត្រូវ! សូមជ្រើសរើសឯកសារ .json ដែលត្រឹមត្រូវ។');
            }
        };
        reader.readAsText(file);
    }

    function saveTemplateLocal() {
        try {
            const dataToSave = { state, batchStudents };
            localStorage.setItem('khmer_cert_saved_template', JSON.stringify(dataToSave));
            alert('បានរក្សាទុកគំរូបច្ចុប្បន្នទុកក្នុង Browser រួចរាល់!');
        } catch (e) {
            console.error('Save template local error:', e);
            alert('ពុំអាចរក្សាទុកគំរូបានឡើយ!');
        }
    }

    function loadTemplateLocal() {
        const saved = localStorage.getItem('khmer_cert_saved_template');
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                if (parsed.state) state = { ...defaultData, ...parsed.state };
                if (parsed.batchStudents && Array.isArray(parsed.batchStudents)) {
                    batchStudents = parsed.batchStudents;
                    currentBatchIndex = 0;
                }
                syncFormWithState();
                renderBatchTable();
                updateCertificateCanvas();
                updateCountBadges();
                alert('បានផ្ទុកគំរូដែលបានរក្សាទុកក្នុង Browser រួចរាល់!');
            } catch (e) {
                alert('មានបញ្ហាក្នុងការផ្ទុកគំរូពី Browser!');
            }
        } else {
            alert('ពុំទាន់មានគំរូដែលបានរក្សាទុកក្នុង Browser ឡើយ!');
        }
    }

    // Attach Template Event Listeners
    const btnExportTemplate = document.getElementById('btn-export-template');
    if (btnExportTemplate) btnExportTemplate.addEventListener('click', exportTemplateJSON);

    const btnImportTemplate = document.getElementById('btn-import-template');
    const inputTemplateFile = document.getElementById('input-template-file');
    if (btnImportTemplate && inputTemplateFile) {
        btnImportTemplate.addEventListener('click', () => inputTemplateFile.click());
        inputTemplateFile.addEventListener('change', (e) => {
            if (e.target.files && e.target.files[0]) {
                importTemplateJSON(e.target.files[0]);
            }
        });
    }

    const btnSaveLocalTemplate = document.getElementById('btn-save-local-template');
    if (btnSaveLocalTemplate) btnSaveLocalTemplate.addEventListener('click', saveTemplateLocal);

    const btnLoadLocalTemplate = document.getElementById('btn-load-local-template');
    if (btnLoadLocalTemplate) btnLoadLocalTemplate.addEventListener('click', loadTemplateLocal);

    // --- GOOGLE SHEETS INTEGRATION SYSTEM ---
    const appsScriptTemplateCode = `function doGet(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = sheet.getDataRange().getValues();
  if (data.length < 2) {
    return ContentService.createTextOutput(JSON.stringify({ status: 'empty', batchStudents: [], state: {} }))
      .setMimeType(ContentService.MimeType.JSON);
  }
  
  var students = [];
  var savedState = {};
  
  for (var i = 1; i < data.length; i++) {
    var row = data[i];
    if (row[0] === '__CONFIG__') {
      try { savedState = JSON.parse(row[1]); } catch(err) {}
      continue;
    }
    if (row[0]) {
      students.push({
        name: String(row[0] || ''),
        gender: String(row[1] || 'ប្រុស'),
        dobDay: String(row[2] || '០១'),
        dobMonth: String(row[3] || 'មករា'),
        dobYear: String(row[4] || '២០១៤'),
        grade: String(row[5] || ''),
        rank: String(row[6] || '')
      });
    }
  }
  
  return ContentService.createTextOutput(JSON.stringify({ status: 'success', batchStudents: students, state: savedState }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    var contents = JSON.parse(e.postData.contents);
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    sheet.clear();
    sheet.appendRow(['ឈ្មោះសិស្ស', 'ភេទ', 'ថ្ងៃកើត', 'ខែកើត', 'ឆ្នាំកើត', 'ថ្នាក់ទី', 'ចំណាត់ថ្នាក់']);
    
    if (contents.batchStudents && contents.batchStudents.length > 0) {
      for (var i = 0; i < contents.batchStudents.length; i++) {
        var s = contents.batchStudents[i];
        sheet.appendRow([s.name, s.gender, s.dobDay, s.dobMonth, s.dobYear, s.grade, s.rank]);
      }
    }
    
    if (contents.state) {
      sheet.appendRow(['__CONFIG__', JSON.stringify(contents.state)]);
    }
    
    return ContentService.createTextOutput(JSON.stringify({ status: 'success', message: 'Saved successfully' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch(err) {
    return ContentService.createTextOutput(JSON.stringify({ status: 'error', message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}`;

    const modalGsheet = document.getElementById('modal-google-sheets');
    const btnGsheetHeader = document.getElementById('btn-google-sheets');
    const btnCloseGsheetModal = document.getElementById('btn-close-gsheet-modal');
    const btnCloseGsheetModal2 = document.getElementById('btn-close-gsheet-modal-2');
    const inputGsheetUrl = document.getElementById('input-gsheet-url');
    const btnSaveGsheetUrl = document.getElementById('btn-save-gsheet-url');
    const gsheetStatusEl = document.getElementById('gsheet-connection-status');
    const btnCopyAppsScript = document.getElementById('btn-copy-apps-script');

    // Load saved GSheet URL on boot
    const savedGsheetUrl = localStorage.getItem('khmer_cert_gsheet_url') || '';
    if (inputGsheetUrl && savedGsheetUrl) {
        inputGsheetUrl.value = savedGsheetUrl;
        updateGsheetStatus(true);
    }

    function updateGsheetStatus(connected) {
        if (!gsheetStatusEl) return;
        if (connected && inputGsheetUrl && inputGsheetUrl.value.trim()) {
            gsheetStatusEl.textContent = 'បានភ្ជាប់រួចរាល់';
            gsheetStatusEl.className = 'px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-700/60';
        } else {
            gsheetStatusEl.textContent = 'មិនទាន់បានភ្ជាប់';
            gsheetStatusEl.className = 'px-2 py-0.5 rounded text-[10px] font-normal bg-slate-700 text-slate-300';
        }
    }

    function openGsheetModal() {
        if (modalGsheet) modalGsheet.classList.remove('hidden');
    }

    function closeGsheetModal() {
        if (modalGsheet) modalGsheet.classList.add('hidden');
    }

    if (btnGsheetHeader) btnGsheetHeader.addEventListener('click', openGsheetModal);
    if (btnCloseGsheetModal) btnCloseGsheetModal.addEventListener('click', closeGsheetModal);
    if (btnCloseGsheetModal2) btnCloseGsheetModal2.addEventListener('click', closeGsheetModal);

    if (btnSaveGsheetUrl) {
        btnSaveGsheetUrl.addEventListener('click', () => {
            const url = inputGsheetUrl ? inputGsheetUrl.value.trim() : '';
            if (url) {
                localStorage.setItem('khmer_cert_gsheet_url', url);
                updateGsheetStatus(true);
                alert('បានរក្សាទុក Google Sheet URL រួចរាល់!');
            } else {
                localStorage.removeItem('khmer_cert_gsheet_url');
                updateGsheetStatus(false);
                alert('បានលុប Google Sheet URL រួចរាល់!');
            }
        });
    }

    if (btnCopyAppsScript) {
        btnCopyAppsScript.addEventListener('click', () => {
            navigator.clipboard.writeText(appsScriptTemplateCode).then(() => {
                alert('បានចម្លងកូដ Google Apps Script រួចរាល់! សូមយកទៅ Paste ក្នុង Google Sheet របស់អ្នក (Extensions -> Apps Script)។');
            }).catch(err => {
                console.error('Copy failed:', err);
                const textArea = document.createElement('textarea');
                textArea.value = appsScriptTemplateCode;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                alert('បានចម្លងកូដ Google Apps Script រួចរាល់!');
            });
        });
    }

    async function saveToGoogleSheets() {
        const url = (inputGsheetUrl && inputGsheetUrl.value.trim()) || localStorage.getItem('khmer_cert_gsheet_url');
        if (!url) {
            alert('សូមបញ្ចូល Google Apps Script Web App URL ជាមុនសិន!');
            openGsheetModal();
            return;
        }

        const btnModal = document.getElementById('btn-modal-gsheet-save');
        const btnQuick = document.getElementById('btn-quick-gsheet-save');
        const origModalText = btnModal ? btnModal.innerHTML : '';
        const origQuickText = btnQuick ? btnQuick.innerHTML : '';

        if (btnModal) btnModal.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> កំពុងរក្សាទុក...`;
        if (btnQuick) btnQuick.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> កំពុងផ្ញើ...`;

        try {
            const payload = {
                batchStudents: batchStudents,
                state: state
            };

            await fetch(url, {
                method: 'POST',
                mode: 'no-cors',
                headers: { 'Content-Type': 'text/plain;charset=utf-8' },
                body: JSON.stringify(payload)
            });

            alert('បានផ្ញើ និងរក្សាទុកទិន្នន័យទៅ Google Sheets រួចរាល់!');
            closeGsheetModal();
        } catch (err) {
            console.error('Save to GSheets failed:', err);
            alert('មានបញ្ហាក្នុងការផ្ញើទិន្នន័យទៅ Google Sheet! សូមពិនិត្យមើល URL ឡើងវិញ។');
        } finally {
            if (btnModal) btnModal.innerHTML = origModalText;
            if (btnQuick) btnQuick.innerHTML = origQuickText;
        }
    }

    async function loadFromGoogleSheets() {
        let url = (inputGsheetUrl && inputGsheetUrl.value.trim()) || localStorage.getItem('khmer_cert_gsheet_url');
        if (!url) {
            alert('សូមបញ្ចូល Google Web App URL ឬ Google Sheet Link ជាមុនសិន!');
            openGsheetModal();
            return;
        }

        const btnModal = document.getElementById('btn-modal-gsheet-load');
        const btnQuick = document.getElementById('btn-quick-gsheet-load');
        const origModalText = btnModal ? btnModal.innerHTML : '';
        const origQuickText = btnQuick ? btnQuick.innerHTML : '';

        if (btnModal) btnModal.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> កំពុងទាញយក...`;
        if (btnQuick) btnQuick.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> កំពុងផ្ទុក...`;

        try {
            // Handle published CSV links or standard spreadsheet view URLs
            if (url.includes('docs.google.com/spreadsheets')) {
                if (url.includes('/edit') || url.includes('/view')) {
                    url = url.replace(/\/edit.*$/, '/export?format=csv').replace(/\/view.*$/, '/export?format=csv');
                }
                const res = await fetch(url);
                const csvText = await res.text();
                const lines = csvText.split(/\r?\n/).filter(line => line.trim().length > 0);
                if (lines.length > 1) {
                    const parsedStudents = [];
                    for (let i = 1; i < lines.length; i++) {
                        const cols = lines[i].split(',').map(c => c.replace(/^"|"$/g, '').trim());
                        if (cols[0] && cols[0] !== '__CONFIG__') {
                            parsedStudents.push({
                                name: cols[0] || '',
                                gender: cols[1] || 'ប្រុស',
                                dobDay: cols[2] || '០១',
                                dobMonth: cols[3] || 'មករា',
                                dobYear: cols[4] || '២០១៤',
                                grade: cols[5] || '',
                                rank: cols[6] || ''
                            });
                        }
                    }
                    if (parsedStudents.length > 0) {
                        batchStudents = parsedStudents;
                        currentBatchIndex = 0;
                        syncSingleFormWithBatch(0);
                        renderBatchTable();
                        updateCertificateCanvas();
                        updateCountBadges();
                        alert(`បានទាញយកបញ្ជីសិស្សចំនួន ${batchStudents.length} នាក់ពី Google Sheet រួចរាល់!`);
                        closeGsheetModal();
                        return;
                    }
                }
            }

            // Web App Apps Script JSON fetch
            const res = await fetch(url);
            const data = await res.json();
            if (data.batchStudents && Array.isArray(data.batchStudents) && data.batchStudents.length > 0) {
                batchStudents = data.batchStudents;
                currentBatchIndex = 0;
                if (data.state) {
                    state = { ...defaultData, ...data.state };
                    syncFormWithState();
                } else {
                    syncSingleFormWithBatch(0);
                }
                renderBatchTable();
                updateCertificateCanvas();
                updateCountBadges();
                alert(`បានទាញយកទិន្នន័យសិស្សចំនួន ${batchStudents.length} នាក់ពី Google Sheet ដោយជោគជ័យ!`);
                closeGsheetModal();
            } else {
                alert('ពុំទាន់មានទិន្នន័យសិស្សនៅក្នុង Google Sheet នៅឡើយទេ!');
            }
        } catch (err) {
            console.error('Load from GSheets failed:', err);
            alert('ពុំអាចទាញយកទិន្នន័យបានឡើយ! សូមពិនិត្យមើលថាតើ Web App ត្រូវបាន Deploy ជា "Anyone" ដែរឬទេ។');
        } finally {
            if (btnModal) btnModal.innerHTML = origModalText;
            if (btnQuick) btnQuick.innerHTML = origQuickText;
        }
    }

    // Attach GSheet Sync Event Listeners
    const btnModalGsheetSave = document.getElementById('btn-modal-gsheet-save');
    const btnModalGsheetLoad = document.getElementById('btn-modal-gsheet-load');
    const btnQuickGsheetSave = document.getElementById('btn-quick-gsheet-save');
    const btnQuickGsheetLoad = document.getElementById('btn-quick-gsheet-load');

    if (btnModalGsheetSave) btnModalGsheetSave.addEventListener('click', saveToGoogleSheets);
    if (btnModalGsheetLoad) btnModalGsheetLoad.addEventListener('click', loadFromGoogleSheets);
    if (btnQuickGsheetSave) btnQuickGsheetSave.addEventListener('click', saveToGoogleSheets);
    if (btnQuickGsheetLoad) btnQuickGsheetLoad.addEventListener('click', loadFromGoogleSheets);

    // Initial Initialization
    renderBatchTable();
    updateCertificateCanvas();
    updateCountBadges();
    initDraggableElements();
});
