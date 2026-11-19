import { Router } from 'express';
import { getTeamMembers, getTeamMemberById } from '../controllers/team.controller';

const router = Router();

router.get('/', getTeamMembers);
router.get('/:id', getTeamMemberById);

export default router;
