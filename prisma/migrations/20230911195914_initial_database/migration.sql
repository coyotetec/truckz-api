-- CreateEnum
CREATE TYPE "TruckType" AS ENUM ('bau', 'bau_frigorifico', 'sider', 'cacamba', 'grade_baixa', 'graneleiro', 'prancha');

-- CreateEnum
CREATE TYPE "LoadStatus" AS ENUM ('active', 'cancelled', 'finished');

-- CreateEnum
CREATE TYPE "DimensionUnit" AS ENUM ('centimeters', 'meters');

-- CreateEnum
CREATE TYPE "WeightUnit" AS ENUM ('grams', 'kilograms', 'tons');

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "avatar_url" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "contractor_id" TEXT,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "address" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "zipcode" TEXT,
    "address" TEXT NOT NULL,
    "number" INTEGER,
    "district" TEXT NOT NULL,
    "reference" TEXT,
    "state" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "latitude" DECIMAL(65,30) NOT NULL,
    "longitude" DECIMAL(65,30) NOT NULL,
    "user_id" TEXT,

    CONSTRAINT "address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contractor" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "cnpj" VARCHAR(14),
    "cpf" VARCHAR(11),
    "state_registration" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "whatsapp_number" TEXT NOT NULL,

    CONSTRAINT "contractor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "driver" (
    "id" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,
    "birth_date" DATE NOT NULL,
    "cpf" VARCHAR(11) NOT NULL,
    "cnh_number" TEXT NOT NULL,
    "cnh_category" TEXT NOT NULL,
    "rntrc" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "whatsapp_number" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "driver_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "truck" (
    "id" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "renavam" TEXT NOT NULL,
    "plate" TEXT NOT NULL,
    "crv_number" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "holder_name" TEXT NOT NULL,
    "holder_cpf" VARCHAR(11),
    "holder_cnpj" VARCHAR(14),
    "type" "TruckType" NOT NULL,
    "axles_qty" INTEGER NOT NULL,
    "tracker" BOOLEAN NOT NULL,
    "driver_id" TEXT NOT NULL,

    CONSTRAINT "truck_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "checkin" (
    "id" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "latitude" DECIMAL(65,30) NOT NULL,
    "longitude" DECIMAL(65,30) NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "checkin_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "driver_id" TEXT NOT NULL,

    CONSTRAINT "checkin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "load" (
    "id" TEXT NOT NULL,
    "title" TEXT,
    "status" "LoadStatus" NOT NULL DEFAULT 'active',
    "price" DECIMAL(65,30) NOT NULL,
    "length" DECIMAL(65,30),
    "width" DECIMAL(65,30),
    "height" DECIMAL(65,30),
    "dimensions_unit" "DimensionUnit",
    "weight" DECIMAL(65,30),
    "weight_unit" "WeightUnit",
    "description" TEXT,
    "pickup_address_id" TEXT NOT NULL,
    "pickup_date" DATE NOT NULL,
    "delivery_address_id" TEXT NOT NULL,
    "delivery_date" DATE NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "seen_times" INTEGER NOT NULL DEFAULT 0,
    "contractor_id" TEXT NOT NULL,

    CONSTRAINT "load_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "load_image" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "load_id" TEXT NOT NULL,

    CONSTRAINT "load_image_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_username_key" ON "user"("username");

-- CreateIndex
CREATE UNIQUE INDEX "contractor_cnpj_key" ON "contractor"("cnpj");

-- CreateIndex
CREATE UNIQUE INDEX "contractor_cpf_key" ON "contractor"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "driver_cpf_key" ON "driver"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "driver_cnh_number_key" ON "driver"("cnh_number");

-- CreateIndex
CREATE UNIQUE INDEX "driver_rntrc_key" ON "driver"("rntrc");

-- CreateIndex
CREATE UNIQUE INDEX "driver_user_id_key" ON "driver"("user_id");

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_contractor_id_fkey" FOREIGN KEY ("contractor_id") REFERENCES "contractor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "address" ADD CONSTRAINT "address_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "driver" ADD CONSTRAINT "driver_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "truck" ADD CONSTRAINT "truck_driver_id_fkey" FOREIGN KEY ("driver_id") REFERENCES "driver"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "checkin" ADD CONSTRAINT "checkin_driver_id_fkey" FOREIGN KEY ("driver_id") REFERENCES "driver"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "load" ADD CONSTRAINT "load_pickup_address_id_fkey" FOREIGN KEY ("pickup_address_id") REFERENCES "address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "load" ADD CONSTRAINT "load_delivery_address_id_fkey" FOREIGN KEY ("delivery_address_id") REFERENCES "address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "load" ADD CONSTRAINT "load_contractor_id_fkey" FOREIGN KEY ("contractor_id") REFERENCES "contractor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "load_image" ADD CONSTRAINT "load_image_load_id_fkey" FOREIGN KEY ("load_id") REFERENCES "load"("id") ON DELETE CASCADE ON UPDATE CASCADE;
