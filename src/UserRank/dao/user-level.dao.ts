// src/user/daos/user-level.dao.ts

export class UserLevelDAO {
    static getUserLevelAndBadge(totalPoints: number): { level: number; badge: string } {
      let level: number;
      let badge: string;
  
      if (totalPoints > 0 && totalPoints <= 100) {
        level = 1; // Bronze
        badge = 'bronze';
      } else if (totalPoints > 100 && totalPoints <= 250) {
        level = 2; // Silver
        badge = 'silver';
      } else if (totalPoints > 250) {
        level = 3; // Gold
        badge = 'gold';
      } else {
        // Default values if no valid points
        level = 1; // You may want to adjust this as necessary
        badge = 'bronze'; // Default to bronze if points are 0 or negative
      }
  
      return { level, badge };
    }
  }
  