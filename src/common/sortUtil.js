const nameParser = require('../name-parser');
const _ = require('underscore');

module.exports.sort_file_by_time = function(files, fileInfos, getBaeName, fromEarly, onlyMtime){
    return _.sortBy(files, a => {
        const fileTimeA = (fileInfos[a] && fileInfos[a].mtimeMs) || Infinity;
        if(onlyMtime){
            return fromEarly ? fileTimeA: -fileTimeA;
        }else{
            const pA = nameParser.parse(getBaeName(a));
            const aboutTimeA = pA && nameParser.getDateFromTags(pA.tags);
            const t1 = aboutTimeA || fileTimeA;
            return fromEarly ? t1: -t1;
        }
    })
}

