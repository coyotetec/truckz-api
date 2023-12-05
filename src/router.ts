import { Router } from 'express';

import ContractorController from './app/controllers/ContractorController';
import DriverController from './app/controllers/DriverController';
import CheckinController from './app/controllers/CheckinController';
import LoadController from './app/controllers/LoadController';
import AuthenticationController from './app/controllers/AuthenticationController';
import AddressController from './app/controllers/AddressController';

import { upload } from './libs/multer';
import { authentication } from './app/middlewares/authentication';
import UserController from './app/controllers/UserController';
import TruckController from './app/controllers/TruckController';

export const router = Router();

router.get('/server-is-up', (request, response) => {
  response.send(true);
});

router.get('/contractors', authentication, ContractorController.show);
router.post(
  '/contractors',
  upload.single('avatar'),
  ContractorController.store,
);
router.put('/contractors', authentication, ContractorController.update);

router.get('/users/:id', authentication, UserController.show);
router.get('/user/:username/available', UserController.username);
router.put(
  '/user',
  authentication,
  upload.single('avatar'),
  UserController.update,
);

router.get('/drivers/:userId', authentication, DriverController.show);
router.post('/drivers', upload.single('avatar'), DriverController.store);
router.put('/drivers', authentication, DriverController.update);

router.get('/checkins', authentication, CheckinController.index);
router.post('/checkins', authentication, CheckinController.store);
router.patch('/checkins/disable', authentication, CheckinController.disable);

router.get('/addresses', authentication, AddressController.index);
router.put('/addresses/:id', authentication, AddressController.update);
router.get('/addresses/:id', authentication, AddressController.show);
router.delete('/addresses/:id', authentication, AddressController.destroy);
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

router.put('/trucks/:id', authentication, TruckController.update);

router.post('/authenticate/login', AuthenticationController.index);
