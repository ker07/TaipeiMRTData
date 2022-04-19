package com.example.TaipeiMRTData.service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

public enum StationCodeToName {

    BR01("BR01", "動物園", "BR", "1996-03-28"),
    BR02("BR02", "木柵", "BR", "1996-03-28"),
    BR03("BR03", "萬芳社區", "BR", "1996-03-28"),
    BR04("BR04", "萬芳醫院", "BR", "1996-03-28"),
    BR05("BR05", "辛亥", "BR", "1996-03-28"),
    BR06("BR06", "麟光", "BR", "1996-03-28"),
    BR07("BR07", "六張犁", "BR", "1996-03-28"),
    BR08("BR08", "科技大樓", "BR", "1996-03-28"),
    BR09("BR09", "大安", "BR", "1996-03-28"),
    BR10("BR10", "忠孝復興", "BR", "1996-03-28"),
    BR11("BR11", "南京復興", "BR", "1996-03-28"),
    BR12("BR12", "中山國中", "BR", "1996-03-28"),
    R11("R11", "中山", "R", "1997-03-28"),
    R12("R12", "雙連", "R", "1997-03-28"),
    R13("R13", "民權西路", "R", "1997-03-28"),
    R14("R14", "圓山", "R", "1997-03-28"),
    R15("R15", "劍潭", "R", "1997-03-28"),
    R16("R16", "士林", "R", "1997-03-28"),
    R17("R17", "芝山", "R", "1997-03-28"),
    R18("R18", "明德", "R", "1997-03-28"),
    R19("R19", "石牌", "R", "1997-03-28"),
    R20("R20", "唭哩岸", "R", "1997-03-28"),
    R21("R21", "奇岩", "R", "1997-03-28"),
    R22("R22", "北投", "R", "1997-03-28"),
    R22A("R22A", "新北投", "R", "1997-03-28"),
    R23("R23", "復興崗", "R", "1997-03-28"),
    R24("R24", "忠義", "R", "1997-03-28"),
    R25("R25", "關渡", "R", "1997-03-28"),
    R26("R26", "竹圍", "R", "1997-03-28"),
    R27("R27", "紅樹林", "R", "1997-03-28"),
    R28("R28", "淡水", "R", "1997-03-28"),
    R10("R10", "台北車站", "R", "1997-12-25"),
    G09("G09", "古亭", "G", "1998-12-24"),
    G10("G10", "中正紀念堂", "G", "1998-12-24"),
    O01("O01", "南勢角", "O", "1998-12-24"),
    O02("O02", "景安", "O", "1998-12-24"),
    O03("O03", "永安市場", "O", "1998-12-24"),
    O04("O04", "頂溪", "O", "1998-12-24"),
    O05("O05", "古亭", "O", "1998-12-24"),
    R08("R08", "中正紀念堂", "R", "1998-12-24"),
    R09("R09", "台大醫院", "R", "1998-12-24"),
    G01("G01", "新店", "G", "1999-11-11"),
    G02("G02", "新店區公所", "G", "1999-11-11"),
    G03("G03", "七張", "G", "1999-11-11"),
    G04("G04", "大坪林", "G", "1999-11-11"),
    G05("G05", "景美", "G", "1999-11-11"),
    G06("G06", "萬隆", "G", "1999-11-11"),
    G07("G07", "公館", "G", "1999-11-11"),
    G08("G08", "台電大樓", "G", "1999-11-11"),
    BL10("BL10", "龍山寺", "BL", "1999-12-24"),
    BL11("BL11", "西門", "BL", "1999-12-24"),
    BL12("BL12", "台北車站", "BL", "1999-12-24"),
    BL13("BL13", "善導寺", "BL", "1999-12-24"),
    BL14("BL14", "忠孝新生", "BL", "1999-12-24"),
    BL15("BL15", "忠孝復興", "BL", "1999-12-24"),
    BL16("BL16", "忠孝敦化", "BL", "1999-12-24"),
    BL17("BL17", "國父紀念館", "BL", "1999-12-24"),
    BL18("BL18", "市政府", "BL", "1999-12-24"),
    BL08("BL08", "新埔", "BL", "2000-08-31"),
    BL09("BL09", "江子翠", "BL", "2000-08-31"),
    G11("G11", "小南門", "G", "2000-08-31"),
    G12("G12", "西門", "G", "2000-08-31"),
    BL19("BL19", "永春", "BL", "2000-12-30"),
    BL20("BL20", "後山埤", "BL", "2000-12-30"),
    BL21("BL21", "昆陽", "BL", "2000-12-30"),
    G03A("G03A", "小碧潭", "G", "2004-09-29"),
    BL02("BL02", "永寧", "BL", "2006-05-31"),
    BL03("BL03", "土城", "BL", "2006-05-31"),
    BL04("BL04", "海山", "BL", "2006-05-31"),
    BL05("BL05", "亞東醫院", "BL", "2006-05-31"),
    BL06("BL06", "府中", "BL", "2006-05-31"),
    BL07("BL07", "BL 板橋", "BL", "2006-05-31"),
    BL22("BL22", "南港", "BL", "2008-12-25"),
    BR13("BR13", "松山機場", "BR", "2009-07-04"),
    BR14("BR14", "大直", "BR", "2009-07-04"),
    BR15("BR15", "劍南路", "BR", "2009-07-04"),
    BR16("BR16", "西湖", "BR", "2009-07-04"),
    BR17("BR17", "港墘", "BR", "2009-07-04"),
    BR18("BR18", "文德", "BR", "2009-07-04"),
    BR19("BR19", "內湖", "BR", "2009-07-04"),
    BR20("BR20", "大湖公園", "BR", "2009-07-04"),
    BR21("BR21", "葫洲", "BR", "2009-07-04"),
    BR22("BR22", "東湖", "BR", "2009-07-04"),
    BR23("BR23", "南港軟體園區", "BR", "2009-07-04"),
    BR24("BR24", "南港展覽館", "BR", "2009-07-04"),
    O07("O07", "忠孝新生", "O", "2010-11-03"),
    O08("O08", "松江南京", "O", "2010-11-03"),
    O09("O09", "行天宮", "O", "2010-11-03"),
    O10("O10", "中山國小", "O", "2010-11-03"),
    O11("O11", "民權西路", "O", "2010-11-03"),
    O12("O12", "大橋頭", "O", "2010-11-03"),
    O50("O50", "三重國小", "O", "2010-11-03"),
    O51("O51", "三和國中", "O", "2010-11-03"),
    O52("O52", "徐匯中學", "O", "2010-11-03"),
    O53("O53", "三民高中", "O", "2010-11-03"),
    O54("O54", "蘆洲", "O", "2010-11-03"),
    BL23("BL23", "南港展覽館", "BL", "2011-02-27"),
    O13("O13", "台北橋", "O", "2012-01-05"),
    O14("O14", "菜寮", "O", "2012-01-05"),
    O15("O15", "三重", "O", "2012-01-05"),
    O16("O16", "先嗇宮", "O", "2012-01-05"),
    O17("O17", "頭前庄", "O", "2012-01-05"),
    O18("O18", "新莊", "O", "2012-01-05"),
    O19("O19", "輔大", "O", "2012-01-05"),
    O06("O06", "東門", "O", "2012-09-30"),
    O20("O20", "丹鳳", "O", "2013-06-29"),
    O21("O21", "迴龍", "O", "2013-06-29"),
    R02("R02", "象山", "R", "2013-11-24"),
    R03("R03", "台北101/世貿", "R", "2013-11-24"),
    R04("R04", "信義安和", "R", "2013-11-24"),
    R05("R05", "大安", "R", "2013-11-24"),
    R06("R06", "大安森林公園", "R", "2013-11-24"),
    R07("R07", "東門", "R", "2013-11-24"),
    G13("G13", "北門", "G", "2014-11-15"),
    G14("G14", "中山", "G", "2014-11-15"),
    G15("G15", "松江南京", "G", "2014-11-15"),
    G16("G16", "南京復興", "G", "2014-11-15"),
    G17("G17", "台北小巨蛋", "G", "2014-11-15"),
    G18("G18", "南京三民", "G", "2014-11-15"),
    G19("G19", "松山", "G", "2014-11-15"),
    BL01("BL01", "頂埔", "BL", "2015-07-06"),
    Y07("Y07", "大坪林", "Y", "2020-01-31"),
    Y08("Y08", "十四張", "Y", "2020-01-31"),
    Y09("Y09", "秀朗橋", "Y", "2020-01-31"),
    Y10("Y10", "景平", "Y", "2020-01-31"),
    Y11("Y11", "景安", "Y", "2020-01-31"),
    Y12("Y12", "中和", "Y", "2020-01-31"),
    Y13("Y13", "橋和", "Y", "2020-01-31"),
    Y14("Y14", "中原", "Y", "2020-01-31"),
    Y15("Y15", "板新", "Y", "2020-01-31"),
    Y16("Y16", "Y 板橋", "Y", "2020-01-31"),
    Y17("Y17", "新埔民生", "Y", "2020-01-31"),
    Y18("Y18", "頭前庄", "Y", "2020-01-31"),
    Y19("Y19", "幸福", "Y", "2020-01-31"),
    Y20("Y20", "新北產業園區", "Y", "2020-01-31");

    StationCodeToName(String stationCode, String stationName, String metroLineCode, String startDate){
        this.stationCode = stationCode;
        this.stationName = stationName;
        this.metroLineCode = metroLineCode;

        Date startDateInDateFormat = new Date();
        try {
            startDateInDateFormat = new SimpleDateFormat("yyyy-MM-dd").parse(String.valueOf(startDate));
        } catch (ParseException e) {
            startDateInDateFormat = new Date(20170101);
        }
        this.startDate = startDateInDateFormat;

    };

    private final String stationCode;
    private final String stationName;
    private final String metroLineCode;
    private final Date startDate;

    public static StationCodeToName getStationInfo(String stationCode){

        switch (stationCode){
            case "BR01": return BR01;
            case "BR02": return BR02;
            case "BR03": return BR03;
            case "BR04": return BR04;
            case "BR05": return BR05;
            case "BR06": return BR06;
            case "BR07": return BR07;
            case "BR08": return BR08;
            case "BR09": return BR09;
            case "BR10": return BR10;
            case "BR11": return BR11;
            case "BR12": return BR12;
            case "R11": return R11;
            case "R12": return R12;
            case "R13": return R13;
            case "R14": return R14;
            case "R15": return R15;
            case "R16": return R16;
            case "R17": return R17;
            case "R18": return R18;
            case "R19": return R19;
            case "R20": return R20;
            case "R21": return R21;
            case "R22": return R22;
            case "R22A": return R22A;
            case "R23": return R23;
            case "R24": return R24;
            case "R25": return R25;
            case "R26": return R26;
            case "R27": return R27;
            case "R28": return R28;
            case "R10": return R10;
            case "G09": return G09;
            case "G10": return G10;
            case "O01": return O01;
            case "O02": return O02;
            case "O03": return O03;
            case "O04": return O04;
            case "O05": return O05;
            case "R08": return R08;
            case "R09": return R09;
            case "G01": return G01;
            case "G02": return G02;
            case "G03": return G03;
            case "G04": return G04;
            case "G05": return G05;
            case "G06": return G06;
            case "G07": return G07;
            case "G08": return G08;
            case "BL10": return BL10;
            case "BL11": return BL11;
            case "BL12": return BL12;
            case "BL13": return BL13;
            case "BL14": return BL14;
            case "BL15": return BL15;
            case "BL16": return BL16;
            case "BL17": return BL17;
            case "BL18": return BL18;
            case "BL08": return BL08;
            case "BL09": return BL09;
            case "G11": return G11;
            case "G12": return G12;
            case "BL19": return BL19;
            case "BL20": return BL20;
            case "BL21": return BL21;
            case "G03A": return G03A;
            case "BL02": return BL02;
            case "BL03": return BL03;
            case "BL04": return BL04;
            case "BL05": return BL05;
            case "BL06": return BL06;
            case "BL07": return BL07;
            case "BL22": return BL22;
            case "BR13": return BR13;
            case "BR14": return BR14;
            case "BR15": return BR15;
            case "BR16": return BR16;
            case "BR17": return BR17;
            case "BR18": return BR18;
            case "BR19": return BR19;
            case "BR20": return BR20;
            case "BR21": return BR21;
            case "BR22": return BR22;
            case "BR23": return BR23;
            case "BR24": return BR24;
            case "O07": return O07;
            case "O08": return O08;
            case "O09": return O09;
            case "O10": return O10;
            case "O11": return O11;
            case "O12": return O12;
            case "O50": return O50;
            case "O51": return O51;
            case "O52": return O52;
            case "O53": return O53;
            case "O54": return O54;
            case "BL23": return BL23;
            case "O13": return O13;
            case "O14": return O14;
            case "O15": return O15;
            case "O16": return O16;
            case "O17": return O17;
            case "O18": return O18;
            case "O19": return O19;
            case "O06": return O06;
            case "O20": return O20;
            case "O21": return O21;
            case "R02": return R02;
            case "R03": return R03;
            case "R04": return R04;
            case "R05": return R05;
            case "R06": return R06;
            case "R07": return R07;
            case "G13": return G13;
            case "G14": return G14;
            case "G15": return G15;
            case "G16": return G16;
            case "G17": return G17;
            case "G18": return G18;
            case "G19": return G19;
            case "BL01": return BL01;
            case "Y07": return Y07;
            case "Y08": return Y08;
            case "Y09": return Y09;
            case "Y10": return Y10;
            case "Y11": return Y11;
            case "Y12": return Y12;
            case "Y13": return Y13;
            case "Y14": return Y14;
            case "Y15": return Y15;
            case "Y16": return Y16;
            case "Y17": return Y17;
            case "Y18": return Y18;
            case "Y19": return Y19;
            case "Y20": return Y20;
            default: return null;
        }
    }

    public String getStationCode() {
        return stationCode;
    }

    public String getStationName() {
        return stationName;
    }

    public String getMetroLineCode() {
        return metroLineCode;
    }

    public Date getStartDate() {
        return startDate;
    }
}
