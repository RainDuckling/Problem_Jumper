document.addEventListener('DOMContentLoaded', () => {
    const siteSelect = document.getElementById('site');
    const atcoderOptions = document.getElementById('atcoder-options');
    const codeforcesOptions = document.getElementById('codeforces-options');
    const luoguOptions = document.getElementById('luogu-options');
    const inputFields = {
        luogu: document.getElementById('problemId'),
        atcoder: {
            contestType: document.getElementById('contestType'),
            contestNumber: document.getElementById('contestNumber'),
            problemLetter: document.getElementById('problemLetter')
        },
        codeforces: {
            contestNumberCF: document.getElementById('contestNumberCF'),
            problemCode: document.getElementById('problemCode')
        }
    };

    function showOptions(site) {
        atcoderOptions.style.display = 'none';
        codeforcesOptions.style.display = 'none';
        luoguOptions.style.display = 'none';

        if (site === 'atcoder') {
            atcoderOptions.style.display = 'block';
            inputFields.atcoder.contestType.focus();
        } else if (site === 'codeforces') {
            codeforcesOptions.style.display = 'block';
            inputFields.codeforces.contestNumberCF.focus();
        } else if (site === 'luogu') {
            luoguOptions.style.display = 'block';
            inputFields.luogu.focus();
        }

        clearInputs(site);
    }

    function clearInputs(site) {
        if (site === 'atcoder') {
            inputFields.atcoder.contestType.value = '';
            inputFields.atcoder.contestNumber.value = '';
            inputFields.atcoder.problemLetter.value = '';
        } else if (site === 'codeforces') {
            inputFields.codeforces.contestNumberCF.value = '';
            inputFields.codeforces.problemCode.value = '';
        } else if (site === 'luogu') {
            inputFields.luogu.value = '';
        }
    }

    function performAction() {
        const site = siteSelect.value;
        if (site === 'atcoder') {
            const contestType = inputFields.atcoder.contestType.value.trim().toUpperCase();
            const contestNumber = inputFields.atcoder.contestNumber.value.trim();
            const problemLetter = inputFields.atcoder.problemLetter.value.trim().toUpperCase();
            if (!contestType || !contestNumber || !problemLetter) {
                alert('请完整填写比赛类型、场次和题目编号！');
                return;
            }
            window.open(`https://atcoder.jp/contests/${contestType}${contestNumber}/tasks/${contestType}${contestNumber}_${problemLetter}`, '_blank');
        } else if (site === 'codeforces') {
            const contestNumber = inputFields.codeforces.contestNumberCF.value.trim();
            const problemCode = inputFields.codeforces.problemCode.value.trim().toUpperCase();
            if (!contestNumber || !problemCode) {
                alert('请完整填写比赛场次和题目编号！');
                return;
            }
            window.open(`https://codeforces.com/contest/${contestNumber}/problem/${problemCode}`, '_blank');
        } else if (site === 'luogu') {
            const problemId = inputFields.luogu.value.trim();
            if (!problemId) {
                alert('请填写题目编号！');
                return;
            }
            if (/^\d+$/.test(problemId)) {
                window.open(`https://www.luogu.com.cn/problem/P${problemId}`, '_blank');
            } else {
                window.open(`https://www.luogu.com.cn/problem/${problemId}`, '_blank');
            }
        }
    }

    function jumpToProblem() {
        performAction();
    }

    function randomJump() {
        const site = siteSelect.value;
        if (site === 'luogu') {
            const min = 1000; // minimum problem ID for Luogu
            const max = 9999; // maximum problem ID for Luogu
            const randomId = Math.floor(Math.random() * (max - min + 1)) + min;
            window.open(`https://www.luogu.com.cn/problem/P${randomId}`, '_blank');
        } else {
            alert('随机跳转功能仅支持洛谷！');
        }
    }

    function switchToNextSite() {
        const sites = ['luogu', 'atcoder', 'codeforces'];
        const currentIndex = sites.indexOf(siteSelect.value);
        const nextIndex = (currentIndex + 1) % sites.length;
        siteSelect.value = sites[nextIndex];
        showOptions(sites[nextIndex]);
    }

    function switchToPreviousSite() {
        const sites = ['luogu', 'atcoder', 'codeforces'];
        const currentIndex = sites.indexOf(siteSelect.value);
        const previousIndex = (currentIndex - 1 + sites.length) % sites.length;
        siteSelect.value = sites[previousIndex];
        showOptions(sites[previousIndex]);
    }

    function switchToPreviousInput() {
        const fields = getVisibleFields();
        const currentField = document.activeElement;
        const currentIndex = fields.indexOf(currentField);
        if (currentIndex > 0) {
            fields[currentIndex - 1].focus();
        } else {
            fields[fields.length - 1].focus();
        }
    }

    function switchToNextInput() {
        const fields = getVisibleFields();
        const currentField = document.activeElement;
        const currentIndex = fields.indexOf(currentField);
        if (currentIndex < fields.length - 1) {
            fields[currentIndex + 1].focus();
        } else {
            fields[0].focus();
        }
    }

    function getVisibleFields() {
        const site = siteSelect.value;
        const fields = [];
        if (site === 'atcoder') {
            fields.push(inputFields.atcoder.contestType, inputFields.atcoder.contestNumber, inputFields.atcoder.problemLetter);
        } else if (site === 'codeforces') {
            fields.push(inputFields.codeforces.contestNumberCF, inputFields.codeforces.problemCode);
        } else if (site === 'luogu') {
            fields.push(inputFields.luogu);
        }
        return fields;
    }

    siteSelect.addEventListener('change', (e) => {
        showOptions(e.target.value);
    });

    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.altKey) {
            switch (e.key) {
                case 'ArrowDown':
                    switchToNextSite();
                    break;
                case 'ArrowUp':
                    switchToPreviousSite();
                    break;
                case 'ArrowLeft':
                    switchToPreviousInput();
                    break;
                case 'ArrowRight':
                    switchToNextInput();
                    break;
            }
        } else if (e.key === 'Enter') {
            performAction();
        }
    });

    document.querySelector('.jump').addEventListener('click', jumpToProblem);
    document.querySelector('.random').addEventListener('click', randomJump);
});
