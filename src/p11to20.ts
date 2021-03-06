export const problem20 = () => {
    const addStringNumbers = (num1: string, num2: string, position: number = 0) => {
        const digits = num2.split('').map(one => Number(one))
        let result = num1
        let currpos = position
        while (digits.length) {
            const digit = digits.shift()
            let tdw = digit + Number(result[currpos] || 0)
            if (tdw > 9) {
                digits[0] = !digits[0] ? 1 : digits[0] + 1
                tdw = tdw - 10
            }
            result = result.substr(0, currpos) + tdw + result.substr(currpos + 1)
            currpos++
        }
        return result
    }

    // const N1 = '1011'
    //     .split('')
    //     .reverse()
    //     .join('')
    // const N2 = '989'
    //     .split('')
    //     .reverse()
    //     .join('')

    // console.log(
    //     addStringNumbers(N1, N2, 0)
    //         .split('')
    //         .reverse()
    //         .join('')
    // )

    const f = 100
    let e = '1'
    for (let i = 1; i < f; i++) {
        let next = e
        for (let n = 0; n < e.length; n++) {
            const L = String(Number(e[n] || 0) * i)
            next = addStringNumbers(
                next,
                L.split('')
                    .reverse()
                    .join(''),
                n
            )
        }
        e = next
    }
    console.log(
        e
            .split('')
            .reverse()
            .join('')
    )
    return e
        .split('')
        .reduce((all, o) => all + Number(o),0)
}
export const problem19 = () => {
    class TDate {
        mns: number[] = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
        d: number = 1
        m: number = 1
        y: number = 1900
        dow: number = 1
        isLeapYear = (y: number) => {
            const by4 = y % 4 === 0
            const by100 = y % 100 === 0
            const by400 = y % 400 === 0
            if (by4 && by400) return true
            if (by4 && !by400 && !by100) return true
            return false
        }
        monthDayCount = (y: number, m: number) => {
            let mn = this.mns[m - 1]
            if (m === 2 && this.isLeapYear(y)) {
                mn++
            }
            return mn
        }
        increment = () => {
            this.d++
            let mn = this.monthDayCount(this.y, this.m)
            if (this.d > mn) {
                this.m++
                this.d = 1
                if (this.m > 12) {
                    this.m = 1
                    this.y++
                }
            }
            this.dow++
            if (this.dow > 7) {
                this.dow = 1
            }
        }
        toString = () => {
            return this.y + ' ' + this.m + ' ' + this.d
        }
        toDate = (y: number, m: number, d: number) => {
            if (m > 12) throw new Error('wrong month')
            let mn = this.monthDayCount(y, m)
            if (d > mn) throw new Error('wrong day')
            const str = y + ' ' + m + ' ' + d
            while (this.toString() !== str) {
                this.increment()
            }
        }
    }
    const startDate = new TDate()
    startDate.toDate(1901, 1, 1)
    let cnt = 0
    while (startDate.toString() !== '2000 12 31') {
        startDate.increment()
        if (startDate.dow === 7 && startDate.d === 1) {
            cnt++
        }
    }
    console.log(startDate.toString() + ' [' + startDate.dow + ']')
    console.log(cnt)
}
export const problem18 = () => {
    const source = [
        [75],
        [95, 64],
        [17, 47, 82],
        [18, 35, 87, 10],
        [20, 4, 82, 47, 65],
        [19, 1, 23, 75, 3, 34],
        [88, 2, 77, 73, 7, 63, 67],
        [99, 65, 4, 28, 6, 16, 70, 92],
        [41, 41, 26, 56, 83, 40, 80, 70, 33],
        [41, 48, 72, 33, 47, 32, 37, 16, 94, 29],
        [53, 71, 44, 65, 25, 43, 91, 52, 97, 51, 14],
        [70, 11, 33, 28, 77, 73, 17, 78, 39, 68, 17, 57],
        [91, 71, 52, 38, 17, 14, 91, 43, 58, 50, 27, 29, 48],
        [63, 66, 4, 68, 89, 53, 67, 30, 73, 16, 69, 87, 40, 31],
        [4, 62, 98, 27, 23, 9, 70, 98, 73, 93, 38, 53, 60, 4, 23],
    ]

    let cx = 1
    let path = [source[0]]
    while (cx < source.length) {
        path[cx] = source[cx].map((current, index) => {
            const indexes = [index - 1, index].filter(one => one !== undefined && one >= 0)
            const vals = indexes.map(idx => path[cx - 1][idx]).filter(one => one !== undefined)
            console.log(current, vals)
            return Math.max(...vals) + current
        })
        cx++
    }
    console.log(path)
    console.log(Math.max(...path[path.length - 1]))
}
export const problem17 = () => {
    const digits = {
        0: 'zero',
        1: 'one',
        2: 'two',
        3: 'three',
        4: 'four',
        5: 'five',
        6: 'six',
        7: 'seven',
        8: 'eight',
        9: 'nine',
        10: 'ten',
        11: 'eleven',
        12: 'twelve',
        13: 'thirteen',
        14: 'fourteen',
        15: 'fifteen',
        16: 'sixteen',
        17: 'seventeen',
        18: 'eighteen',
        19: 'nineteen',
        20: 'twenty',
        30: 'thirty',
        40: 'forty',
        50: 'fifty',
        60: 'sixty',
        70: 'seventy',
        80: 'eighty',
        90: 'ninety',
        100: 'hundred',
    }
    const numberToString = (num: number) => {
        let curr = String(num)
        let result = ''
        while (curr.length) {
            switch (true) {
                case curr.length === 1:
                    switch (true) {
                        case num === 0:
                            result = digits[0]
                            break
                        case Number(curr) === 0:
                            break
                        default:
                            result = result.length ? result + ' ' : ''
                            result += digits[Number(curr)]
                            break
                    }
                    curr = ''
                    break
                case curr.length === 2:
                    switch (true) {
                        case Number(curr) === 0:
                            curr = ''
                            break
                        case Number(curr) < 21:
                            result = String(num).length > 2 ? result + ' and' : ''
                            result = result.length ? result + ' ' : ''
                            result += digits[Number(curr)]
                            curr = ''
                            break
                        case Number(curr.substr(0, 1)) === 0:
                            curr = curr.substr(1)
                            break
                        default:
                            result = String(num).length > 2 ? result + ' and' : ''
                            result = result.length ? result + ' ' : ''
                            result += digits[Number(curr.substr(0, 1)) * 10]
                            curr = curr.substr(1)
                            break
                    }
                    break
                case curr.length === 3:
                    result = result.length ? result + ' ' : ''
                    result += digits[Number(curr.substr(0, 1))] + ' ' + digits[100]
                    curr = curr.substr(1)
                    break
                default:
                    curr = curr.substr(1)
                    break
            }
        }
        return result
    }

    let cnt = 0
    for (let i = 1; i < 1000; i++) {
        const num = numberToString(i)
        cnt += num.replace(/ /gi, '').length
        console.log(num)
    }
    cnt += String('onethousand').length
    console.log(cnt)
}
export const problem16 = () => {
    const pow = 1000

    let arr = new Array(Math.round(pow / 2)).fill(0)
    arr[0] = 2
    let carry = 0

    for (let j = 1; j < pow; j++) {
        for (let i = 0; i < arr.length; i++) {
            let tempno = arr[i] * 2

            if (tempno > 9) {
                arr[i] = (tempno % 10) + carry
                carry = 1
            } else {
                arr[i] = tempno + carry
                carry = 0
            }
        }
    }
    console.log(arr.reduce((sum, one) => sum + one, 0))
}
export const problem15 = () => {
    const max = 21

    const f = Array(max)
        .fill(undefined)
        .map(() => Array(max).fill(0))

    f[0] = Array(max).fill(1)
    for (let i = 0; i < max; i++) {
        f[i][0] = 1
    }

    for (let i = 1; i < max; i++) {
        for (let j = 1; j < max; j++) {
            f[i][j] = f[i - 1][j] + f[i][j - 1]
        }
    }
    return f[max - 1][max - 1]
}
export const problem14 = () => {
    const isOdd = (n: number) => n % 2 !== 0

    const getChain = (n: number) => {
        let init = n
        let chain = [n]
        while (init > 1) {
            init = isOdd(init) ? init * 3 + 1 : init / 2
            chain.push(init)
        }
        return chain
    }

    let max = 0
    let best = []
    let index = 14
    for (let num = 14; num < 1000000; num++) {
        const chain = getChain(num)
        if (chain.length > max) {
            max = chain.length
            best = chain
            index = num
        }
    }
    console.log(index, max, JSON.stringify(best))
}
export const problem13 = () => {
    const a =
        37107287533902102798797998220837590246510135740250 +
        46376937677490009712648124896970078050417018260538 +
        74324986199524741059474233309513058123726617309629 +
        91942213363574161572522430563301811072406154908250 +
        23067588207539346171171980310421047513778063246676 +
        89261670696623633820136378418383684178734361726757 +
        28112879812849979408065481931592621691275889832738 +
        44274228917432520321923589422876796487670272189318 +
        47451445736001306439091167216856844588711603153276 +
        70386486105843025439939619828917593665686757934951 +
        62176457141856560629502157223196586755079324193331 +
        64906352462741904929101432445813822663347944758178 +
        92575867718337217661963751590579239728245598838407 +
        58203565325359399008402633568948830189458628227828 +
        80181199384826282014278194139940567587151170094390 +
        35398664372827112653829987240784473053190104293586 +
        86515506006295864861532075273371959191420517255829 +
        71693888707715466499115593487603532921714970056938 +
        54370070576826684624621495650076471787294438377604 +
        53282654108756828443191190634694037855217779295145 +
        36123272525000296071075082563815656710885258350721 +
        45876576172410976447339110607218265236877223636045 +
        17423706905851860660448207621209813287860733969412 +
        81142660418086830619328460811191061556940512689692 +
        51934325451728388641918047049293215058642563049483 +
        62467221648435076201727918039944693004732956340691 +
        15732444386908125794514089057706229429197107928209 +
        55037687525678773091862540744969844508330393682126 +
        18336384825330154686196124348767681297534375946515 +
        80386287592878490201521685554828717201219257766954 +
        78182833757993103614740356856449095527097864797581 +
        16726320100436897842553539920931837441497806860984 +
        48403098129077791799088218795327364475675590848030 +
        87086987551392711854517078544161852424320693150332 +
        59959406895756536782107074926966537676326235447210 +
        69793950679652694742597709739166693763042633987085 +
        41052684708299085211399427365734116182760315001271 +
        65378607361501080857009149939512557028198746004375 +
        35829035317434717326932123578154982629742552737307 +
        94953759765105305946966067683156574377167401875275 +
        88902802571733229619176668713819931811048770190271 +
        25267680276078003013678680992525463401061632866526 +
        36270218540497705585629946580636237993140746255962 +
        24074486908231174977792365466257246923322810917141 +
        91430288197103288597806669760892938638285025333403 +
        34413065578016127815921815005561868836468420090470 +
        23053081172816430487623791969842487255036638784583 +
        11487696932154902810424020138335124462181441773470 +
        63783299490636259666498587618221225225512486764533 +
        67720186971698544312419572409913959008952310058822 +
        95548255300263520781532296796249481641953868218774 +
        76085327132285723110424803456124867697064507995236 +
        37774242535411291684276865538926205024910326572967 +
        23701913275725675285653248258265463092207058596522 +
        29798860272258331913126375147341994889534765745501 +
        18495701454879288984856827726077713721403798879715 +
        38298203783031473527721580348144513491373226651381 +
        34829543829199918180278916522431027392251122869539 +
        40957953066405232632538044100059654939159879593635 +
        29746152185502371307642255121183693803580388584903 +
        41698116222072977186158236678424689157993532961922 +
        62467957194401269043877107275048102390895523597457 +
        23189706772547915061505504953922979530901129967519 +
        86188088225875314529584099251203829009407770775672 +
        11306739708304724483816533873502340845647058077308 +
        82959174767140363198008187129011875491310547126581 +
        97623331044818386269515456334926366572897563400500 +
        42846280183517070527831839425882145521227251250327 +
        55121603546981200581762165212827652751691296897789 +
        32238195734329339946437501907836945765883352399886 +
        75506164965184775180738168837861091527357929701337 +
        62177842752192623401942399639168044983993173312731 +
        32924185707147349566916674687634660915035914677504 +
        99518671430235219628894890102423325116913619626622 +
        73267460800591547471830798392868535206946944540724 +
        76841822524674417161514036427982273348055556214818 +
        97142617910342598647204516893989422179826088076852 +
        87783646182799346313767754307809363333018982642090 +
        10848802521674670883215120185883543223812876952786 +
        71329612474782464538636993009049310363619763878039 +
        62184073572399794223406235393808339651327408011116 +
        66627891981488087797941876876144230030984490851411 +
        60661826293682836764744779239180335110989069790714 +
        85786944089552990653640447425576083659976645795096 +
        66024396409905389607120198219976047599490197230297 +
        64913982680032973156037120041377903785566085089252 +
        16730939319872750275468906903707539413042652315011 +
        94809377245048795150954100921645863754710598436791 +
        78639167021187492431995700641917969777599028300699 +
        15368713711936614952811305876380278410754449733078 +
        40789923115535562561142322423255033685442488917353 +
        44889911501440648020369068063960672322193204149535 +
        41503128880339536053299340368006977710650566631954 +
        81234880673210146739058568557934581403627822703280 +
        82616570773948327592232845941706525094512325230608 +
        22918802058777319719839450180888072429661980811197 +
        77158542502016545090413245809786882778948721859617 +
        72107838435069186155435662884062257473692284509516 +
        20849603980134001723930671666823555245252804609722 +
        53503534226472524250874054075591789781264330331690
    console.log(
        String(a)
            .replace('.', '')
            .substr(0, 10)
    )
}
export const problem12 = () => {
    const getFactorsCount = (num: number) => {
        let factors = 2
        let increment = 1
        let start = 2

        if (num % 2 !== 0) {
            increment = 2
            start = 3
        }

        for (let factor = start; factor <= num / 2; factor += increment) {
            if (num % factor === 0) {
                factors++
            }
        }
        return factors
    }

    let trNum = 1
    for (let i = 2; i < 20000; i++) {
        trNum = trNum + i
        if (i > 10000) {
            const n = getFactorsCount(trNum)
            if (i % 100 === 0) {
                console.log('over ' + i)
            }
            if (n > 400) {
                console.log(i, 'Triangle Number: ' + trNum, 'Factors: ' + n)
            }
            if (n > 500) {
                console.log(i, 'Triangle Number: ' + trNum, 'Factors: ' + n)
                return trNum
            }
        }
    }
}

export const problem11 = () => {
    // prettier-ignore
    const matrix = [
		["08", "02", "22", "97", "38", "15", "00", "40", "00", "75", "04", "05", "07", "78", "52", "12", "50", "77", "91", "08",],
		["49", "49", "99", "40", "17", "81", "18", "57", "60", "87", "17", "40", "98", "43", "69", "48", "04", "56", "62", "00",],
		["81", "49", "31", "73", "55", "79", "14", "29", "93", "71", "40", "67", "53", "88", "30", "03", "49", "13", "36", "65",],
		["52", "70", "95", "23", "04", "60", "11", "42", "69", "24", "68", "56", "01", "32", "56", "71", "37", "02", "36", "91",],
		["22", "31", "16", "71", "51", "67", "63", "89", "41", "92", "36", "54", "22", "40", "40", "28", "66", "33", "13", "80",],
		["24", "47", "32", "60", "99", "03", "45", "02", "44", "75", "33", "53", "78", "36", "84", "20", "35", "17", "12", "50",],
		["32", "98", "81", "28", "64", "23", "67", "10", "26", "38", "40", "67", "59", "54", "70", "66", "18", "38", "64", "70",],
		["67", "26", "20", "68", "02", "62", "12", "20", "95", "63", "94", "39", "63", "08", "40", "91", "66", "49", "94", "21",],
		["24", "55", "58", "05", "66", "73", "99", "26", "97", "17", "78", "78", "96", "83", "14", "88", "34", "89", "63", "72",],
		["21", "36", "23", "09", "75", "00", "76", "44", "20", "45", "35", "14", "00", "61", "33", "97", "34", "31", "33", "95",],
		["78", "17", "53", "28", "22", "75", "31", "67", "15", "94", "03", "80", "04", "62", "16", "14", "09", "53", "56", "92",],
		["16", "39", "05", "42", "96", "35", "31", "47", "55", "58", "88", "24", "00", "17", "54", "24", "36", "29", "85", "57",],
		["86", "56", "00", "48", "35", "71", "89", "07", "05", "44", "44", "37", "44", "60", "21", "58", "51", "54", "17", "58",],
		["19", "80", "81", "68", "05", "94", "47", "69", "28", "73", "92", "13", "86", "52", "17", "77", "04", "89", "55", "40",],
		["04", "52", "08", "83", "97", "35", "99", "16", "07", "97", "57", "32", "16", "26", "26", "79", "33", "27", "98", "66",],
		["88", "36", "68", "87", "57", "62", "20", "72", "03", "46", "33", "67", "46", "55", "12", "32", "63", "93", "53", "69",],
		["04", "42", "16", "73", "38", "25", "39", "11", "24", "94", "72", "18", "08", "46", "29", "32", "40", "62", "76", "36",],
		["20", "69", "36", "41", "72", "30", "23", "88", "34", "62", "99", "69", "82", "67", "59", "85", "74", "04", "36", "16",],
		["20", "73", "35", "29", "78", "31", "90", "01", "74", "31", "49", "71", "48", "86", "81", "16", "23", "57", "05", "54",],
		["01", "70", "54", "71", "83", "51", "54", "69", "16", "92", "33", "48", "61", "43", "52", "01", "89", "19", "67", "48",],
		]

    enum TDir {
        left = 'left',
        right = 'right',
        down = 'down',
        up = 'up',
        downLeft = 'downLeft',
        downRight = 'downRight',
        upLeft = 'upLeft',
        upRight = 'upRight',
    }
    const getLine = (dir: TDir, x: number, y: number) => {
        let cx = x
        let cy = y
        let line = [matrix[x][y]]
        for (let cnt = 1; cnt <= 3; cnt++) {
            switch (dir) {
                case TDir.down:
                    cy++
                    break
                case TDir.downLeft:
                    cy++
                    cx--
                    break
                case TDir.downRight:
                    cy++
                    cx++
                    break
                case TDir.left:
                    cx--
                    break
                case TDir.right:
                    cx++
                    break
                case TDir.up:
                    cy--
                    break
                case TDir.upLeft:
                    cy--
                    cx--
                    break
                case TDir.upRight:
                    cy--
                    cx++
                    break
            }

            if (matrix[cx] === undefined) return []
            if (matrix[cx][cy] === undefined) return []
            line.push(matrix[cx][cy])
        }
        return line
    }

    const getLines = (x: number, y: number) => {
        const lines = [
            getLine(TDir.down, x, y),
            getLine(TDir.up, x, y),
            getLine(TDir.left, x, y),
            getLine(TDir.right, x, y),
            getLine(TDir.downRight, x, y),
            getLine(TDir.downLeft, x, y),
            getLine(TDir.upRight, x, y),
            getLine(TDir.upLeft, x, y),
        ]
        return lines.map(line => {
            return line.reduce((mul, one) => {
                return mul * Number(one)
            }, 1)
        })
    }

    let max = 0
    for (let x = 0; x < 20; x++) {
        for (let y = 0; y < 20; y++) {
            const lines = getLines(x, y)
            if (Math.max(...lines) > max) {
                max = Math.max(...lines)
            }
        }
    }
    return max
}
