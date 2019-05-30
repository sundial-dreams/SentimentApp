const host = "http://www.theaurora.cn:3000";
const devHost = "http://localhost:3000";
export const fetchUrl = `${ devHost }/sentimentAnalyzer`;

export const sentimentMap = {
    1: { sentiment: "happy", emotion: "(●'◡'●)" },
    2: { sentiment: "anger", emotion: "(￢︿̫̿￢☆)" },
    3: { sentiment: "sad", emotion: "┭┮﹏┭┮" },
    4: { sentiment: "fear", emotion: "o((⊙﹏⊙))o." },
    5: { sentiment: "boredom", emotion: "（＞人＜；）" },
    6: { sentiment: "disgust", emotion: "←_←" },
    7: { sentiment: "neutral", emotion: "(￣(工)￣)" }
};
export const mergeClass = (...cssClass) => cssClass.reduce((acc, cur) => (acc + cur + " "), "");
