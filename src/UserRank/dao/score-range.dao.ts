// src/user/daos/score-range.dao.ts

export class ScoreRangeDAO {
    static getScoreRange(badge: string): string {
      switch (badge) {
        case 'bronze':
          return '0 - 100';
        case 'silver':
          return '101 - 250';
        case 'gold':
          return '251 and above';
        default:
          return 'Not defined';
      }
    }
  }
//A DAO is a type of abstraction that isolates the code responsible for data access and persistence 
//from the code responsible for performing application logic.  