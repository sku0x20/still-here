(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.myBundle = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BarsDatabase = void 0;
class BarsDatabase {
    constructor(barsObj) {
        this.barsObject = barsObj;
    }
    getKeyCount() {
        return Object.keys(this.barsObject).length;
    }
    getValueCount(keyIndex) {
        const key = this.getKeyAt(keyIndex);
        const valueArray = this.barsObject[key];
        return valueArray.length;
    }
    getKeyAt(index) {
        const key = Object.keys(this.barsObject)[index];
        if (key === undefined) {
            throw new RangeError("Key Index out of Bound");
        }
        return key;
    }
    getValueAt(keyIndex, valueIndex) {
        const key = this.getKeyAt(keyIndex);
        const valueArray = this.barsObject[key];
        const value = valueArray[valueIndex];
        if (value === undefined) {
            throw new RangeError("Value Index out of Bound");
        }
        return value;
    }
    popValueAt(keyIndex, valueIndex) {
        const key = this.getKeyAt(keyIndex);
        const valueArray = this.barsObject[key];
        const value = valueArray[valueIndex];
        if (value === undefined) {
            throw new RangeError("Value Index out of Bound");
        }
        valueArray.splice(valueIndex, 1);
        return value;
    }
}
exports.BarsDatabase = BarsDatabase;

},{}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ButtonClickEvent = void 0;
var ButtonClickEvent;
(function (ButtonClickEvent) {
    ButtonClickEvent[ButtonClickEvent["PLAY"] = 0] = "PLAY";
    ButtonClickEvent[ButtonClickEvent["OPTION_0"] = 1] = "OPTION_0";
    ButtonClickEvent[ButtonClickEvent["OPTION_1"] = 2] = "OPTION_1";
    ButtonClickEvent[ButtonClickEvent["OPTION_2"] = 3] = "OPTION_2";
    ButtonClickEvent[ButtonClickEvent["OPTION_3"] = 4] = "OPTION_3";
    ButtonClickEvent[ButtonClickEvent["SKIP"] = 5] = "SKIP";
    ButtonClickEvent[ButtonClickEvent["END"] = 6] = "END";
    ButtonClickEvent[ButtonClickEvent["PLAY_AGAIN"] = 7] = "PLAY_AGAIN";
})(ButtonClickEvent = exports.ButtonClickEvent || (exports.ButtonClickEvent = {}));

},{}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Quiz = void 0;
class Quiz {
    constructor(question, options, answer) {
        this.question = question;
        this.options = options;
        this.answer = answer;
    }
    equals(obj) {
        return this.question === obj.question;
    }
}
exports.Quiz = Quiz;

},{}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuizGenerator = void 0;
const Quiz_1 = require("./Quiz");
class QuizGenerator {
    constructor(barsDatabase, numberGenerator) {
        this.database = barsDatabase;
        this.numberGenerator = numberGenerator;
    }
    generate() {
        return this.newQuiz();
    }
    newQuiz() {
        const answerKeyIndex = this.numberGenerator(this.database.getKeyCount());
        const questionIndex = this.numberGenerator(this.database.getValueCount(answerKeyIndex));
        const question = this.database.popValueAt(answerKeyIndex, questionIndex);
        const answerKey = this.database.getKeyAt(answerKeyIndex);
        let options = [answerKey];
        let i = 0;
        while (i < 3) {
            const optionIndex = this.numberGenerator(this.database.getKeyCount());
            const option = this.database.getKeyAt(optionIndex);
            if (!options.includes(option)) {
                options.push(option);
                i++;
            }
        }
        this.shuffle(options);
        return new Quiz_1.Quiz(question, options, options.indexOf(answerKey));
    }
    shuffle(a) {
        var j, x, i;
        for (i = a.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = a[i];
            a[i] = a[j];
            a[j] = x;
        }
        return a;
    }
}
exports.QuizGenerator = QuizGenerator;

},{"./Quiz":3}],5:[function(require,module,exports){
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Templates = void 0;
const PlayTemplate = __importStar(require("./templates/PlayTemplate"));
const QuizTemplate = __importStar(require("./templates/QuizTemplate"));
const ScoreTemplate = __importStar(require("./templates/ScoreTemplate"));
class Templates {
    constructor() {
    }
    static startingPage() {
        return PlayTemplate.templateString();
    }
    static quizPage(quiz) {
        return QuizTemplate.templateString(quiz);
    }
    static scorePage(score, total) {
        return ScoreTemplate.templateString(score, total);
    }
}
exports.Templates = Templates;

},{"./templates/PlayTemplate":9,"./templates/QuizTemplate":10,"./templates/ScoreTemplate":11}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buttonClick = void 0;
const BarsDatabase_1 = require("./BarsDatabase");
const ButtonClickEvent_1 = require("./ButtonClickEvent");
const QuizGenerator_1 = require("./QuizGenerator");
const randomNumberGenerator_1 = require("./randomNumberGenerator");
const stillHereBars_1 = require("./stillHereBars");
const Templates_1 = require("./Templates");
const barsDatabase = new BarsDatabase_1.BarsDatabase(stillHereBars_1.stillHereBarsObj);
const quizGenerator = new QuizGenerator_1.QuizGenerator(barsDatabase, randomNumberGenerator_1.randomNumberGenerator);
let currentQuiz;
let score = 0;
let total = 0;
function buttonClick(type) {
    let mainContainer = document.getElementsByClassName("main-container")[0];
    if (type === ButtonClickEvent_1.ButtonClickEvent.PLAY) {
        currentQuiz = quizGenerator.generate();
        mainContainer.innerHTML = Templates_1.Templates.quizPage(currentQuiz);
    }
    else if (isOption(type)) {
        if (getOptionFromType(type) === currentQuiz.answer) {
            increaseScore();
        }
        increaseTotal();
        nextQuiz(mainContainer);
    }
    else if (type === ButtonClickEvent_1.ButtonClickEvent.SKIP) {
        increaseTotal();
        nextQuiz(mainContainer);
    }
    else if (type === ButtonClickEvent_1.ButtonClickEvent.END) {
        mainContainer.innerHTML = Templates_1.Templates.scorePage(score, total);
    }
    else if (type === ButtonClickEvent_1.ButtonClickEvent.PLAY_AGAIN) {
        window.location.reload();
    }
}
exports.buttonClick = buttonClick;
function nextQuiz(mainContainer) {
    if (questionsRemaining()) {
        currentQuiz = quizGenerator.generate();
        mainContainer.innerHTML = Templates_1.Templates.quizPage(currentQuiz);
    }
    else {
        mainContainer.innerHTML = Templates_1.Templates.scorePage(score, total);
    }
}
function questionsRemaining() {
    return total !== stillHereBars_1.stillHereBarsCount;
}
function isOption(type) {
    return type === ButtonClickEvent_1.ButtonClickEvent.OPTION_0
        || type === ButtonClickEvent_1.ButtonClickEvent.OPTION_1
        || type === ButtonClickEvent_1.ButtonClickEvent.OPTION_2
        || type === ButtonClickEvent_1.ButtonClickEvent.OPTION_3;
}
function getOptionFromType(type) {
    return (type - 1);
}
function increaseScore() {
    score++;
}
function increaseTotal() {
    total++;
}

},{"./BarsDatabase":1,"./ButtonClickEvent":2,"./QuizGenerator":4,"./Templates":5,"./randomNumberGenerator":7,"./stillHereBars":8}],7:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.randomNumberGenerator = void 0;
function randomNumberGenerator(upperBound) {
    return Math.floor(Math.random() * upperBound);
}
exports.randomNumberGenerator = randomNumberGenerator;

},{}],8:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stillHereBarsCount = exports.stillHereBarsObj = void 0;
exports.stillHereBarsObj = {
    "Intro": [
        `Yeh hai gehra dard, ye hai karwa such
        Deal with the devil, ye hai mera karz
        Li thi zimmedari, Ye hai mera farz`,
        `Buland hain mere hausle, (haan)
        Dekhe mene aate jaate bohot se (yahan)`,
        `Kyun bane saare yahan sher, bina kiye arz?Iss duniya se jaana anjaan, ye mera khauf hai
        Shayad sunne mujhe meri maut pe ye (haan)`,
        `Hope this music helps you through the bad days
        Aas paas khaali bottalеin aur bhari ashtrays`,
        `Mere man me nahi betha koi vehm
        You can always get these hands, if you’re fucking with the gang`,
        `Ab Batana kyun zaroori jub ye jaante who I am
        Desi rap ka 44 calibre killer - Son of Sam`,
        `Such nahi bolte mere enemies
        Jab miloge then keep the same energy`,
        `When I go, karna pour thodi Hennessy
        On a roll, do it all for the Legacy`,
        `Meri jagah pe nahi and you’ll never be
        Mene rapper boht tange like a centipede`,
        `Dilli sheher me paida n I’m repping G
        Har cheez ki lagti yahan jack jaise Tennessee`,
        `Commitment waale issues bro, I don’t ever see love
        Life marathon, everybody tryna keep up`,
        `Thoda fame paa ke lage mile jeet jab
        Chamche ghoome aas paas jaise teacup`,
        `No no, I don’t fall for that
        Inko toh chahiye thoda pyaar
        I don’t offer that`,
        `Raat guzaaroo studio me
        Then I call for cabs`,
        `Dedicate kari hai life
        And that’s all for rap`,
        `Kaun hai saath - tumhare crew for life?
        All I need is one mic, wo hai true for life`,
        `Garv hai uspe, khudse ghuske khud ke push se
        Bharosa agar mujhpe - I proved them right`,
        `Sellout bola, par me sellout nahi tha
        Lage saare corny, par ye Kellogg’s nahi tha`,
        `A Middle class child, kabhi well off nahi tha
        Me toh grind pe hi raha, kiya fell off nahi tha`,
        `It’s on, till I die, ye hi plan
        Kari thodi mehnat toh bane thode bands`,
        `Thank you for the love agar bane mere fan
        Par tum fan nahi, fam
        It’s Awaam till the end`,
        `Legendary, jaise B.I.G
        Pehchaan ne lage log, I don’t need ID`,
        `5th class bhi, mere liya tab hard thi, mushkil se kari pass thi
        Aaj paas pe hai VIP`,
        `Aise hi fir tables turn
        Rappers get beat, no Ableton`,
        `Jab dikha dead end, I made a turn
        Jinhone sunnayi mujhe fable, watch those labels burn`,
        `Laga Kuch Dikkat hai inhe
        They don’t want to see me winning`,
        `2020 mene ghar bethe note gine
        2021 I’m about to Make a killing`,
        `Mujhe sab dikhe clear
        Hustle meri Sincere`,
        `Mujhe sab dikhe clear
        Dil me na fear`,
        `Mujhe sab dikhe clear
        Kiya mene persevere`,
        `Mujhe sab dikhe clear
        That’s why i’m Still Here`
    ],
    "What's My Name": [
        `Don’t come around me, no way (no)
        Meri gang saari saath, we don’t play (no)`,
        `Hype thodi bahut inko de do
        You don’t really want war, better lay low`,
        `Rehn de, Tu Rehn de
        Ye batein kare gang ke
        But asliyat me naram
        Lagale marham ya band-aid`,
        `No Handshakes for these damn snakes
        Mere sheher me bande
        Stick to that iron
        Jaise pancakes`,
        `Who’s that?
        The king, bеtter crown me`,
        `Har line mеt-a-4, jaise rap me hai boundry
        Bola me hoo king, beta crown me
        Rap me tum junior, lagte ho Robert Downey`,
        `Lit aaya, me karoonga spit fire
        Ye karenge retire, I’m taking this shit higher, Wow`,
        `Chillaya par tujh me na skill paaya
        Ink zaya kar ke bhi jo na likh paaya wo`,
        `Skill hai sick, Jaante ab ill hai krish
        Jeeb meri clip, iss double barrel se bhi mile kiss`,
        `Inke lips chodu neele jaise mile crips
        Jaldi faadu rapper jaise birthday pe mile gift`,
        `Me hoo real ye to feel kare saare
        Toh KR$NA bhi jub padhare ab ye kneel kare saare`,
        `Cheen-na chah rahe, ye to cheel bane saale
        Karta hoon me stand out, mass appeal kare saare`,
        `Kehna jo kehna hai kehne do
        Me sicker jaise weak liver pe liquor sipper`,
        `No fikar or panic mode
        Hannibal, khaoo rappers jaise cannibal`,
        `Karoonga damage, lagoo me savage
        We banish ametures`,
        `Who’s that?
        The microphone wrecker`,
        `Bhai se kaun behtar?
        Laaya cyclone weather`,
        `Click clack
        Lyrical rap - aaya yahan kaun le kar?`,
        `I am known better
        Leave the mic alone bredder`,
        `Aaj kal ye light weights kare mera time waste
        Mind pe but shit might get ugly jaise blind dates`,
        `Grind dekh, when I rhyme, badta crime rate
        Ye hai dollar sign, har line kare define great`
    ],
    "Roll Up": [
        `When I Roll Up
        Saare Launde Phenke Gang Signs
        Everybody Knows`,
        `When I Roll Up
        Sheeshe Neeche Poore Night
        Main To Ride Karun Slow`,
        `Roll Up No Defeat Aaya Jeet Ke
        Street Se Seekh Ke Iraade Mere Dheet The`,
        `Deep The Vaaste Mere Bhi Is Sangeet Se
        Atlantis Hai Yeh Rap Gehre Naate Mere Beat Se`,
        `Cheethde Kiye Inke Liye Nahi Ehsan Maine
        Bolte Lyrics Rakh Simple Thoda Aaram Lele`,
        `Aaj Unhi Lyrics Se Banai Hai Pehchaan Maine
        Daaruwala Nahi Par Chhoda Inhe Bezaan Maine`,
        `Aah! Tanne Samajh Mein Na Aaye Kya
        Baal Baal Bache Jaise Yahan Koyi Naayi Tha`,
        `Chhup Ke Chale Chaal Beef Mein Kasai Ka
        Dikhe Zara Fame Ab Banega Tu Bhi Bhai Kya`,
        `Mera Daur Aaya Mood Hua Kharaab Inka
        Hota Afsos Dekh Ke Mujhe Yahan Aaj Zinda`,
        `Par Sookhi Ghaas Mein Milta Nahi Hai Khaas Tinka
        Mujhe Chahiye Legacy Tujhe Kamana 5 Din Ka`,
        `That’s The Difference Between Me And You
        Maine Sab Banaya Khud Jaise B N Q`,
        `Sath Mere Badshah Gehdiyan Poori Raat Haan
        Dollar Sign Dikhe Zyada Jaise Dala Hai Daaka`,
        `Daal Le Apni Security Guard Main Kalla
        Kaanpad Main Dard Jaise Daadh Mein`,
        `Utha Toofan Ho Jaise Registaan Mein
        Tendulkar Sharjah 1998`,
        `Wagon Ke Aage Se R Hataya Pichhe Laga G
        Punjabi Mein C Ra Karaya Lagaa Zee`,
        `Woh Chahe Mera End Mera Pichhe Laga B
        Verse Aisi Drop Kari Maine Piche Laga Re`,
        `Sab Number’on Ka Game Boy
        Views Ko Maar Goli Aaja Tu Streams Mein`,
        `Forbes Ke Mutabik One Of The Highest Paids
        Lekin Aaj Bhi Maa C*** Ki Leta Nahi Fees Main`,
        `Ae Shararat Hone Wali Hai
        Inhein Pata Nahi Inki Kya Haalat Hone Wali Hai`,
        `Nishana Mera Kabhi Chooka Nahi
        Kr$Na Hai Sath Mein Mahabharat Hone Wali Hai`,
        `Thodi Buddhi Garam Aye
        Karwa Na Liyo Guddi Garam Aye`,
        `Peeragadhi Ke Flyover Jaise High West
        Dilli Ke Launde Hum Hain Kutti Firim Bhai`
    ],
    "Dream": [
        `14 saal, London sheher
        Likha pehla rap
        Wo tha moment
        Fell in love the pen and pad`,
        `Mere paas bhi tha will jaise Men in black
        School me dete dhamki me bhi sunki
        I just send it back`,
        `School ka sabse popular rapper tha Troy
        Radio pe uske gaane everybody knew the boy`,
        `Usne naam diya mujhe, undercover thug
        Kyunki shakal se sharif but on the mic I fuck it up`,
        `Validation thodi aane lagi haath
        School me gangster dete bhav, karne lage mujhse baat`,
        `Ibrahim bana dost, sunta Cormega aur Nas
        Uski wajah se mene jaake recording kari start`,
        `Barnfield estate me tha kisi ka stu
        Jisme gaana record karne ki icha thi meri khoob`,
        `Toh Naam rakha Phyxer aur banaya mene crew
        Bane hum ‘The Royal Rappers’ in 2002`,
        `I Just had a dream
        Since I was just a teen, karna chahta tha me rap
        Bana na chahta tha me scene`,
        `Yea I Just had a dream
        Jub inko na yakeen, put my city on my back
        Aaj scene hai haseen`,
        `Charcha hone lagi, badne lagi baat
        Mujhe apnane lage - ladke jo school me the hard`,
        `(That’s Krsna, he’s safe man, he can rap init -
        Oi Krsna bruv, can you rap for a minute)`,
        `Aise baatein sunke me bhi hone laga khush
        Hanging with the crooks, meri badali puri look`,
        `Baggy tracks, air max on my foot, rock karta
        Parka Jacket with the fur on the hood`,
        `Ab MC Phyxer hogaya addict sa
        Kharida sasta mic aur lagaya on the mixer`,
        `Record kare jaakee mene tape pe tape
        Verses the ek se ek, dekh I know you get the picture`,
        `Me tha khush, mene dhoondi apni calling
        Raat ko pirate radio stations pe karta call in`,
        `Ab Jaise hi school me mujhe thori pehchaan mili
        Next thing I know, I’m on a flight back to delhi (what the fuck)`,
        `Umar 16, dilli bhi lagne laga ab naya
        Sochta tha me aksar yaar kidhar fas gaya`,
        `Jo banaya wo gawaya, mujhe bahut fikar
        Kyunki Kiski ko hip hop ka na thoda bhi shauk idhar`,
        `School ki copy ke peeche likhta tha lyrics
        Apne favourite rappers ke flow bhi Karta tha me mimic`,
        `Aise nikale 2 saal, I thought it was finished
        Par 18 pe college me meri Banane lagi image`,
        `Mile Su.1 aur 2D, jinhe rap ka tha shauk
        Hum ne banaya ek group - Illicit Cash Mobb`,
        `2005, Record kiye Kuch gaane humne
        Hip Hop Nights Delhi me, log bhi pehchane hume`,
        `Young and hungry, wo din ab lagte hai best
        We Didn’t rap for the cheques, we just rapped for respect`,
        `Fir 2006 me, solo artist bana me next
        Naam rakha Prozpekt, I guess you know the rest`
    ],
    "Fall Off": [
        `Yo
        They think about the fall off`,
        `Bolre hai KR$NA ki hype khatam hori hai bro
        KR$NA ki hype toh bas beef se aayi thi`,
        `Hype bane jabse meri hype bane
        Life me na mile mujhe, mere sage bhai bane`,
        `Mind kare par kabhi na grind kare
        Genocide lage jab mic pe meri thodi vibe bane`,
        `Killer bars aaj, mujhe Bhide paanch saat
        Unke mille yahan laash, ye na mereliye khaas baat`,
        `Mile yahan naag, dil he aaj saaf
        Har kill hai vardaat, mera skill hai shandaar`,
        `Gand fadh, karoon me tandav chal, charoo me chand ab
        Karoon me kaand ab kal`,
        `Chahiye beef, banoo me sand ab, toddu maidan
        Ab bane kyun janwar sab? lage kyun Bandhav Garh?`,
        `Har beat pe killer bana marzi se
        Cold mera flow toh shabd bhi mere barfeele`,
        `Chahiye inhe smoke, toh lo banoonga charsee me
        Baatein karke jo provoke kare wo barfi hai`,
        `Inke barre mujhe fikar na hai khaas
        I might kill ‘em with the venom, when I hit ‘em in the heart`,
        `I'm Developing a rhythm, n I get em with the bars
        Ye to sentimental rappers Inka Jigar nai hai hard`,
        `Ooof, I’m on to the next
        Gentleman I'm killing these rappers that want to test`,
        `Murder instrumentals, fir karoo na zyaada flex
        Inhe kabar me sula doo, see I put ‘em all to rest`,
        `Ye to bhai
        Karta rahoonga me day or night`,
        `Move, Thoda dey do side
        Bhage mere aage
        Jaise ye off-side(Oooh)`,
        `Hum me fark hi hai yun
        Dekh ke mujhe teri jalti hai, kyun?`,
        `Baat chali - farzi hai tu
        Dil mera cold, pooche sardi hai kyun?`,
        `Aaj kal Saare bane mere critic
        Kare badi baatein but they can never live it`,
        `Agar li hai mene side, then I ride to defend it
        Label dekhe mene bahaut but the grind is independent`,
        `Came back
        Jab inhe lagne laga that i'm finished
        Itne saal ki mehnat, kare judge in a minute`,
        `Mere wajeh se behtar kare ye gande se lyrics
        Inke dhande hai gimmick, ye to bande hai timid`,
        `Back to back ye fact, meri limit nahi
        Karta hoo track pe attack with ability`,
        `Fact toh ye whack hai, me rap ka epitome
        Act kare mad, But they actually feeling me`,
        `Mujhe Aksar, bolte the buss kar
        Rah me dat kar, gaya nahi daftar`,
        `Har avsar pe lagta me officer
        Ye pen militant, har akshar hai lashkar`,
        `They thought I’m bout to fall off
        Now they got plans they gotta call off`,
        `Came in the game like a 12 gadge pump
        That's a gun that's sawed off`,
        `They thought I'm bout to fall off
        Now they got plans they gotta call off`,
        `Said my flow kinda hot, but I ain't tryna talk
        If she don't take it all off`
    ],
    "Saza-e-Maut": [
        `Dekh ke mujhe mat bhaunk
        Ek shabd bole opp, that’s too much talk`,
        `G town boys, mera block
        Kare rep Southwest, that’s too much Sauce`,
        `Dil me bhara hai khauf, tu bada hai soft
        Tu dara hai bahut`,
        `Inko chada hai shauk, toh laga hai chalk
        Ye gaana hai Saza-e maut`,
        `Mere sheher me launde hazir
        Kaafi kaabil, gang me dakhil`,
        `Rappers karte baatein
        I don’t care what who’s saying like Nasir`,
        `Savage - jahil
        Kaam me maahir, beat pe lagta shayar`,
        `Tu dil se kayar, mil ke ghayal
        Drive by - swift desire`,
        `Kya chall raha hai bol? (bol)
        Yahan halla hai shor`,
        `Mere sheher me log kare spray
        You can catch these Strays like Frendicoes`,
        `Tell me, who run it?
        Bandook chale Bam jaise Bhuvan hai`,
        `Dilli sheher, if you really want smoke
        Yahan karega choke - Pardushan hai`,
        `Baatein inki lagi mujhe bekaar
        Agar naam nahi liya mera ek baar`,
        `If it’s dollar sign then it’s K.R
        Rehman, deta shot jaise A.R`,
        `Balling - Neymar
        Drilling - ek chaar`,
        `Me na victim, I’m more like Vikram, might pull up with
        A ghost, that’s Betaal`,
        `Kaam aitihaasik (atihaasik)
        Mukaam mene kiya hai haasil`,
        `Kaise aakhir?
        Mic pe bana me kaatil (bana me kaatil)`,
        `Tu bana kyun naag, tu bana kyun saanp
        Tu bane kyun shaatir? (shaatir)`,
        `Tu aa raha kyun paas, tu kar raha kyun baat?
        Tu sada kyun jaake? (haan)`,
        `Gala ye ghot, gala jo chala to saza-e-maut
        Gala ye goat, gala jo chala to saza-e-maut`,
        `Ab hongi milke baate
        Dilli me milenge yeh til milate`,
        `Gun wun wali karein filmi baate
        Mile dhan dhan bhardunga inme chaate`,
        `Bin bata ke milunga na din batake
        Gin lagake milunga na gym lagake`,
        `Jimme baat hai mere mile jisse jagah pe
        Jhanjhanaat hai kano me bin patakhe`,
        `Yeh mera farz hai
        Inka to purge hi marz hai`,
        `Mujhpe na khane ko tars hai
        Inko chatane ko farsh hai`,
        `Ab na yeh chuhon ka varsh hai
        (OX OX)`,
        `Humne banaya game tumne lagaya game
        We are not the same`,
        `Ab lu me kiska name
        Too many snakes to blame`,
        `Lagu me pop
        Karu me smoke
        Bodies we drop`,
        `Thane aur court
        Khane me note
        Get at your throat`,
        `Loco par karte ni coke
        Ina-the bando we dope`,
        `Na na na we never broke
        Winners neva eva neva eva eva broke`
    ],
    "Na Hai Time": [
        `Mere paas
        Na hai time
        Call kare par, busy meri line`,
        `Subah shaam
        On the grind
        Jab tak dikhe nahi mujhe dollar sign (dollar sign)`,
        `Ooh ooh bolne lage jhoot
        Ooh ooh dekha inka asli roop`,
        `Ooh ooh lage kaafi naram ye
        Bolte saare KR$NA to booth me kaafi garam hai`,
        `Call karte mujhe jaise hum hai dost (ya)
        Tum na jante mujhe, hum na kabhi close yaar`,
        `Ye Zindagi hai meri, ye na koi joke
        Issiliye muskuraata nahi karta jub me pose, (ya)`,
        `Flash, kare mujhe flash, merе paas na hai time
        If it ain’t about the cash`,
        `Boli boy, Kar relax
        You need to havе some fun
        Wo karna chahti aish par`,
        `Tu na jaane mujhe khaas bro
        Fly me lagoo jaise jhaaz ho`,
        `Log bolte sirf paisa karta baat to
        Fir kyun yahan gawah raha apni saans ko?`,
        `Oh no oh no
        Tu hai kaun, I don’t know`,
        `Chahiye money, chahiye fame
        Chahiye dono`,
        `Bolo bolo, Kahan hai jo jo
        Daga deke gaye
        Ab na dikhte wo log`,
        `Duniya mene peeche chodi
        Bole speed kar dheere thodi`,
        `Haqeeqat boli
        Lagta meri jeet ab hogi`,
        `Me aur tu na homies, hum na brodies
        You don’t know me`,
        `Bhagoo teri chori. karke chori
        Nirav Modi`
    ],
    "Living Legend": [
        `Kismat ne roka
        Par lad ke hum aaye
        Jo bole namumkin,
        Hum kar ke dikhaye`,
        `Karenge ye yaad
        Agar yahan se hum jaaye
        Iss khel main hum legend,
        And legends never die`,
        `Lelo salah meri
        Ab kalakari mujhe fal hai de rahi`,
        `Kalam chala toh teri kala ko jala degi
        Galan teri na suchi hai tu toh bada veli
        Inki jagah le li toh zindigi bhi ab daga deri (wow)`,
        `haram kiya inka mene jeena
        Bahaya khoon aur paseena
        Sab kuch clear hai, aquafina
        Like wow`,
        `Net pe beth ke bole
        One love, I don’t give a f**k
        Serving these rappers up
        Jaise mein serena, (wow)`,
        `kon achiever,
        Ye toh saaf hai kafi`,
        `Aana taani kar ya taaka jhaaki
        Ye kalam hai zyada bhari`,
        `Tokiyo na mujhe
        Kyo-tu marna chahta jaani
        Game hai mujhe pyaari
        I’m her hero shr my nagasaki`,
        `Arey arey kyun lage ye dare dare
        Dekhe mujhe ageh bade to sade pade`,
        `Ye khade khade
        Jale pade, hum aise nahi pale bade`,
        `Mujhse kyun ye ladr mare?
        Haar bhi ab inke gale chade`,
        `Flow icey, mahaul lage moscow
        Tera bhai lage baller, no cosco`,
        `Dekhe yahan aate jaate maine boht log
        That red dot will make you do a dash
        Jaise mosre code`,
        `Lagai class, likhai meri khaas
        Kamyaabi ki hai bhook
        Aur viraasat ki hai pyaas, haan`,
        `Kali das, har gaana itihaas
        Jaunga main aaj toh
        Karenge mujhe yaad, haan`,
        `Kathin raaste, tu jaanch le,
        Hum hanfte nahi
        Saanp bhare ghaas main
        Hum faasle se bhagte nahi`,
        `Chipe inkr raaz paise baant le
        Ye naachte bhi`,
        `Rap meri art toh
        Phir ladunga samaj se hi`,
        `Legends never die,
        They rise, karenge fight
        Ye lies kare divide par
        Guys kare deny ye`,
        `Grind kare bhai toh
        Rise karenge high
        Sachai karega write toh
        Hype banega mic pe`,
        `Deen imaam nahi khoya,
        Maine paya jo boya`,
        `Jitna chahya nahi khaaya
        Phir bhi maine paya hai dhoka`,
        `This city I ran,
        Jaise hoon main ayatollah`,
        `Tu high hai thoda
        Aaya to laaya fire,
        Ab safaya hoga`,
        `Godh bhare memne,
        Ab goat bane game main`,
        `Sound kare same,
        Ye toh lame lage name se`,
        `Bhagwan mera namesake,
        Jwala mera aim dekh`,
        `Hall of fame nahi daalo
        Mujhe hall of flame mein`
    ]
};
exports.stillHereBarsCount = 210;

},{}],9:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.templateString = void 0;
const ButtonClickEvent_1 = require("../ButtonClickEvent");
const playString = `
    <div class="container-items ">
        <div class="inner-item main-screen-heading">
            <span style="align-self:flex-start;">Still</span>
            <span style="align-self:flex-end;">Here</span>
        </div>
    </div>
    <div class="container-items">
        <div class="inner-item">
            <button class="btn option-btn fourth" onclick="myBundle.buttonClick('${ButtonClickEvent_1.ButtonClickEvent.PLAY}')">Play</button>
        </div>
    </div>
`;
function templateString() {
    return playString;
}
exports.templateString = templateString;

},{"../ButtonClickEvent":2}],10:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.templateString = void 0;
const ButtonClickEvent_1 = require("../ButtonClickEvent");
const quizString = `
    <div class="container-items ">
        <div class="inner-item heading-item">
            <span>Still Here</span>
        </div>
    </div>
    <div class="container-items ">
        <div class="inner-item bars">
            {bars}
        </div>
    </div>
    <div class="container-items">
        <div class="inner-item">
            <button class="btn option-btn fourth" onclick="myBundle.buttonClick(${ButtonClickEvent_1.ButtonClickEvent.OPTION_0})">{option0}</button>
        </div>
    </div>
    <div class="container-items">
        <div class="inner-item">
            <button class="btn option-btn fourth" onclick="myBundle.buttonClick(${ButtonClickEvent_1.ButtonClickEvent.OPTION_1})">{option1}</button>
        </div>
    </div>
    <div class="container-items">
        <div class="inner-item">
            <button class="btn option-btn fourth" onclick="myBundle.buttonClick(${ButtonClickEvent_1.ButtonClickEvent.OPTION_2})">{option2}</button>
        </div>
    </div>
    <div class="container-items">
        <div class="inner-item">
            <button class="btn option-btn fourth" onclick="myBundle.buttonClick(${ButtonClickEvent_1.ButtonClickEvent.OPTION_3})">{option3}</button>
        </div>
    </div>
    <div class="container-items">
        <div class="inner-item last-item">
            <button class="btn fourth" onclick="myBundle.buttonClick(${ButtonClickEvent_1.ButtonClickEvent.END})">End</button>
            <button class="btn fourth" onclick="myBundle.buttonClick(${ButtonClickEvent_1.ButtonClickEvent.SKIP})">Skip</button>
        </div>
    </div>
`;
function templateString(quiz) {
    let generatedString = quizString;
    generatedString = insertOptions(generatedString, quiz.options);
    generatedString = insertBars(generatedString, quiz.question);
    return generatedString;
}
exports.templateString = templateString;
function insertOptions(quizString, options) {
    let generatedString = quizString;
    generatedString = generatedString.replace("{option0}", options[0]);
    generatedString = generatedString.replace("{option1}", options[1]);
    generatedString = generatedString.replace("{option2}", options[2]);
    generatedString = generatedString.replace("{option3}", options[3]);
    return generatedString;
}
function insertBars(quizString, question) {
    let bars = question.split(/\n\s+/g);
    let barsHTML = "";
    for (let bar of bars) {
        barsHTML += `<span>${bar}</span>`;
    }
    let generateString = quizString;
    generateString = generateString.replace("{bars}", barsHTML);
    return generateString;
}

},{"../ButtonClickEvent":2}],11:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.templateString = void 0;
const ButtonClickEvent_1 = require("../ButtonClickEvent");
const scoreString = `
    <div class="container-items ">
        <div class="inner-item score-heading">
            <span>Still Here</span>
        </div>
    </div>
    <div class="container-items">
        <div class="inner-item score">
            <span>You Scored: </span>
            <span style="font-size: 6rem; font-weight: bold;">{score}/{total}</span>
        </div>
    </div>
        <div class="container-items ">
        <div class="inner-item advice">
            <span>Listen to</span>
            <span style="cursor:pointer; font-size: 3rem; font-weight: bold;"
                onclick="window.open('https://krsna.bfan.link/still-here', '_blank').focus();" >Still Here</span>
        </div>
    </div>
    <div class="container-items">
        <div class="inner-item">
            <button class="btn option-btn fourth" onclick="myBundle.buttonClick(${ButtonClickEvent_1.ButtonClickEvent.PLAY_AGAIN})">Play Again</button>
        </div>
    </div>
`;
function templateString(score, total) {
    let generatedString = scoreString;
    generatedString = generatedString.replace("{score}", score.toString());
    generatedString = generatedString.replace("{total}", total.toString());
    return generatedString;
}
exports.templateString = templateString;

},{"../ButtonClickEvent":2}]},{},[6])(6)
});
