"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRoundName = getRoundName;
// participantsCount = тухайн шатанд үлдсэн оролцогчдын тоо
function getRoundName(participantsCount) {
    switch (participantsCount) {
        case 2:
            return "Final";
        case 4:
            return "Semifinal";
        case 8:
            return "Quarterfinal";
        default:
            // Хэрвээ 16, 32 ... тохиолдолд Round 1, Round 2 гэх мэт
            const roundNumber = Math.log2(participantsCount);
            return `Round ${roundNumber}`;
    }
}
//# sourceMappingURL=get-round-name.js.map