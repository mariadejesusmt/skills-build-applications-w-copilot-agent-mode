import { Router } from 'express';
import { User } from './models/user.js';
import { Team } from './models/team.js';
import { Activity } from './models/activity.js';
import { Leaderboard } from './models/leaderboard.js';
import { Workout } from './models/workout.js';
const router = Router();
const resourceModels = {
    users: User,
    teams: Team,
    activities: Activity,
    leaderboard: Leaderboard,
    workouts: Workout,
};
for (const [resource, Model] of Object.entries(resourceModels)) {
    const resourcePath = `/api/${resource}`;
    router.get([resourcePath, `${resourcePath}/`], async (_req, res) => {
        try {
            const items = await Model.find({});
            res.json(items);
        }
        catch (error) {
            res.status(500).json({ message: `Error fetching ${resource}`, error });
        }
    });
    router.get([`${resourcePath}/:id`, `${resourcePath}/:id/`], async (req, res) => {
        try {
            const item = await Model.findById(req.params.id);
            if (!item) {
                res.status(404).json({ message: `${resource} not found` });
                return;
            }
            res.json(item);
        }
        catch (error) {
            res.status(500).json({ message: `Error fetching ${resource}`, error });
        }
    });
}
export default router;
