import { Router } from 'express';

import ContractorController from './app/controllers/ContractorController';
import DriverController from './app/controllers/DriverController';
import CheckinController from './app/controllers/CheckinController';
import LoadController from './app/controllers/LoadController';
import AuthenticationController from './app/controllers/AuthenticationController';
import AddressController from './app/controllers/AddressController';

import { upload } from './libs/multer';
import { authentication } from './app/middlewares/authentication';

export const router = Router();

router.get('/server-is-up', (request, response) => {
  response.send(true);
});

router.post(
  '/contractors',
  upload.single('avatar'),
  ContractorController.store,
);
router.get('/contractors/:username/available', ContractorController.username);

router.post('/drivers', DriverController.store);

router.get('/checkins', CheckinController.index);
router.post('/checkins', authentication, CheckinController.store);

router.get('/addresses', authentication, AddressController.index);
router.post('/addresses', authentication, AddressController.store);

router.get('/loads', authentication, LoadController.index);
router.get('/loads/:id', authentication, LoadController.show);
router.post(
  '/loads',
  authentication,
  upload.array('images'),
  LoadController.store,
);
router.delete('/loads/:id', authentication, LoadController.close);
router.put(
  '/loads/:id',
  authentication,
  upload.array('images'),
  LoadController.update,
);

router.post('/authenticate/login', AuthenticationController.index);
