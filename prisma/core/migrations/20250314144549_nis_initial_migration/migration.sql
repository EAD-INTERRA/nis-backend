-- CreateEnum
CREATE TYPE "Resource" AS ENUM ('RESOURCE_A', 'RESOURCE_B');

-- CreateEnum
CREATE TYPE "PermissionLevel" AS ENUM ('READ', 'READ_VIEW');

-- CreateEnum
CREATE TYPE "NotificationType" AS ENUM ('OUTGOING', 'INCOMING');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('Male', 'Female');

-- CreateEnum
CREATE TYPE "MaritalStatus" AS ENUM ('Single', 'Married', 'Widowed', 'Divorced');

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "password_salt" TEXT NOT NULL DEFAULT '',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "activation_token" TEXT,
    "activation_token_sentAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "password_reset_token" TEXT,
    "password_reset_token_sentAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "login_token" INTEGER,
    "login_token_sentAt" TIMESTAMP(3),
    "last_login" TIMESTAMP(3),
    "refresh_token_hash" TEXT,
    "refresh_token_expires_at" TIMESTAMP(3)
);

-- CreateTable
CREATE TABLE "user_detail" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "role_id" TEXT,
    "phone" TEXT,
    "gender" "Gender",
    "address" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT false,
    "is_super_admin" BOOLEAN NOT NULL DEFAULT false,
    "creator_id" TEXT,
    "updater_id" TEXT,

    CONSTRAINT "user_detail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "role" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_by" TEXT,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_by" TEXT,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "permission" (
    "id" TEXT NOT NULL,
    "resource" "Resource" NOT NULL,
    "level" "PermissionLevel" NOT NULL,

    CONSTRAINT "permission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notification_channel" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_by" TEXT,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "receivedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "notification_channel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notification_provider" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_by" TEXT,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "receivedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "notification_provider_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notification_log" (
    "id" TEXT NOT NULL,
    "channel_id" TEXT,
    "provider_id" TEXT,
    "type" "NotificationType" NOT NULL,
    "status_code" INTEGER,
    "content" TEXT NOT NULL,
    "reference_no" TEXT,
    "phone_numbers" TEXT[],
    "emails" TEXT[],
    "user_id" INTEGER,
    "sent_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "received_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "notification_log_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "audit" (
    "id" TEXT NOT NULL,
    "user_id" TEXT,
    "ip" TEXT,
    "action" TEXT,
    "path" TEXT,
    "description" TEXT,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "audit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "project" (
    "id" TEXT NOT NULL,
    "fields" JSONB,
    "ip" TEXT,
    "action" TEXT,
    "description" TEXT,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "port_of_entry" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "port_of_entry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "country" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "country_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "state" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "state_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nationality" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "external_id" TEXT NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "nationality_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "visa_type" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "fee" INTEGER NOT NULL DEFAULT 0,
    "validity" INTEGER NOT NULL DEFAULT 0,
    "max_stay" INTEGER NOT NULL DEFAULT 0,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "visa_type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "visa_requirement" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "visa_requirement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "passport_type" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "passport_type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "applicant" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "middle_name" TEXT,
    "date_of_birth" TIMESTAMP(3) NOT NULL,
    "place_of_birth" TEXT NOT NULL,
    "nationality_id" TEXT NOT NULL,
    "gender" "Gender" NOT NULL,
    "marital_status" "MaritalStatus" NOT NULL,
    "passport_no" TEXT NOT NULL,
    "passport_expiry_date" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "applicant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "travel_info" (
    "id" TEXT NOT NULL,
    "applicant_id" TEXT,
    "purpose" TEXT NOT NULL,
    "airline" TEXT NOT NULL,
    "flight_no" TEXT NOT NULL,
    "country_id" TEXT NOT NULL,
    "date_of_departure" TIMESTAMP(3) NOT NULL,
    "date_of_arrrival" TIMESTAMP(3) NOT NULL,
    "port_id" TEXT NOT NULL,
    "duration_of_stay" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "travel_info_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contact_detail" (
    "id" TEXT NOT NULL,
    "applicant_id" TEXT,
    "contact_name" TEXT NOT NULL,
    "contact_no" TEXT NOT NULL,
    "contact_email" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "postal_code" TEXT NOT NULL,
    "state_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "contact_detail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "supporting_document" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "visa_requirement_id" TEXT NOT NULL,
    "applicant_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "supporting_document_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PermissionToRole" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_PermissionToRole_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_NationalityToVisaType" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_NationalityToVisaType_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_NationalityToPassportType" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_NationalityToPassportType_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_VisaRequirementToVisaType" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_VisaRequirementToVisaType_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_id_key" ON "user"("id");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_login_token_key" ON "user"("login_token");

-- CreateIndex
CREATE INDEX "user_email_idx" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_detail_user_id_key" ON "user_detail"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_detail_phone_key" ON "user_detail"("phone");

-- CreateIndex
CREATE INDEX "user_detail_phone_user_id_idx" ON "user_detail"("phone", "user_id");

-- CreateIndex
CREATE INDEX "role_name_idx" ON "role"("name");

-- CreateIndex
CREATE INDEX "permission_resource_level_idx" ON "permission"("resource", "level");

-- CreateIndex
CREATE UNIQUE INDEX "notification_channel_name_key" ON "notification_channel"("name");

-- CreateIndex
CREATE INDEX "notification_channel_name_idx" ON "notification_channel"("name");

-- CreateIndex
CREATE UNIQUE INDEX "notification_provider_name_key" ON "notification_provider"("name");

-- CreateIndex
CREATE INDEX "notification_provider_name_idx" ON "notification_provider"("name");

-- CreateIndex
CREATE INDEX "notification_log_channel_id_provider_id_idx" ON "notification_log"("channel_id", "provider_id");

-- CreateIndex
CREATE INDEX "audit_user_id_ip_idx" ON "audit"("user_id", "ip");

-- CreateIndex
CREATE INDEX "project_ip_idx" ON "project"("ip");

-- CreateIndex
CREATE INDEX "port_of_entry_name_idx" ON "port_of_entry"("name");

-- CreateIndex
CREATE INDEX "country_name_idx" ON "country"("name");

-- CreateIndex
CREATE INDEX "state_name_idx" ON "state"("name");

-- CreateIndex
CREATE INDEX "nationality_name_idx" ON "nationality"("name");

-- CreateIndex
CREATE INDEX "visa_type_name_idx" ON "visa_type"("name");

-- CreateIndex
CREATE INDEX "visa_requirement_id_name_idx" ON "visa_requirement"("id", "name");

-- CreateIndex
CREATE INDEX "passport_type_id_name_idx" ON "passport_type"("id", "name");

-- CreateIndex
CREATE INDEX "applicant_passport_no_idx" ON "applicant"("passport_no");

-- CreateIndex
CREATE INDEX "travel_info_applicant_id_country_id_port_id_idx" ON "travel_info"("applicant_id", "country_id", "port_id");

-- CreateIndex
CREATE INDEX "contact_detail_applicant_id_state_id_idx" ON "contact_detail"("applicant_id", "state_id");

-- CreateIndex
CREATE INDEX "supporting_document_visa_requirement_id_applicant_id_idx" ON "supporting_document"("visa_requirement_id", "applicant_id");

-- CreateIndex
CREATE INDEX "_PermissionToRole_B_index" ON "_PermissionToRole"("B");

-- CreateIndex
CREATE INDEX "_NationalityToVisaType_B_index" ON "_NationalityToVisaType"("B");

-- CreateIndex
CREATE INDEX "_NationalityToPassportType_B_index" ON "_NationalityToPassportType"("B");

-- CreateIndex
CREATE INDEX "_VisaRequirementToVisaType_B_index" ON "_VisaRequirementToVisaType"("B");

-- AddForeignKey
ALTER TABLE "user_detail" ADD CONSTRAINT "user_detail_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_detail" ADD CONSTRAINT "user_detail_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "role"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_detail" ADD CONSTRAINT "user_detail_creator_id_fkey" FOREIGN KEY ("creator_id") REFERENCES "user_detail"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_detail" ADD CONSTRAINT "user_detail_updater_id_fkey" FOREIGN KEY ("updater_id") REFERENCES "user_detail"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "role" ADD CONSTRAINT "role_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "user_detail"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "role" ADD CONSTRAINT "role_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "user_detail"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notification_channel" ADD CONSTRAINT "notification_channel_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "user_detail"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notification_provider" ADD CONSTRAINT "notification_provider_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "user_detail"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notification_log" ADD CONSTRAINT "notification_log_channel_id_fkey" FOREIGN KEY ("channel_id") REFERENCES "notification_channel"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notification_log" ADD CONSTRAINT "notification_log_provider_id_fkey" FOREIGN KEY ("provider_id") REFERENCES "notification_provider"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "audit" ADD CONSTRAINT "audit_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user_detail"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "applicant" ADD CONSTRAINT "applicant_nationality_id_fkey" FOREIGN KEY ("nationality_id") REFERENCES "nationality"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "travel_info" ADD CONSTRAINT "travel_info_applicant_id_fkey" FOREIGN KEY ("applicant_id") REFERENCES "applicant"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "travel_info" ADD CONSTRAINT "travel_info_country_id_fkey" FOREIGN KEY ("country_id") REFERENCES "country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "travel_info" ADD CONSTRAINT "travel_info_port_id_fkey" FOREIGN KEY ("port_id") REFERENCES "port_of_entry"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contact_detail" ADD CONSTRAINT "contact_detail_applicant_id_fkey" FOREIGN KEY ("applicant_id") REFERENCES "applicant"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contact_detail" ADD CONSTRAINT "contact_detail_state_id_fkey" FOREIGN KEY ("state_id") REFERENCES "state"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "supporting_document" ADD CONSTRAINT "supporting_document_visa_requirement_id_fkey" FOREIGN KEY ("visa_requirement_id") REFERENCES "visa_requirement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "supporting_document" ADD CONSTRAINT "supporting_document_applicant_id_fkey" FOREIGN KEY ("applicant_id") REFERENCES "applicant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PermissionToRole" ADD CONSTRAINT "_PermissionToRole_A_fkey" FOREIGN KEY ("A") REFERENCES "permission"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PermissionToRole" ADD CONSTRAINT "_PermissionToRole_B_fkey" FOREIGN KEY ("B") REFERENCES "role"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_NationalityToVisaType" ADD CONSTRAINT "_NationalityToVisaType_A_fkey" FOREIGN KEY ("A") REFERENCES "nationality"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_NationalityToVisaType" ADD CONSTRAINT "_NationalityToVisaType_B_fkey" FOREIGN KEY ("B") REFERENCES "visa_type"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_NationalityToPassportType" ADD CONSTRAINT "_NationalityToPassportType_A_fkey" FOREIGN KEY ("A") REFERENCES "nationality"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_NationalityToPassportType" ADD CONSTRAINT "_NationalityToPassportType_B_fkey" FOREIGN KEY ("B") REFERENCES "passport_type"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_VisaRequirementToVisaType" ADD CONSTRAINT "_VisaRequirementToVisaType_A_fkey" FOREIGN KEY ("A") REFERENCES "visa_requirement"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_VisaRequirementToVisaType" ADD CONSTRAINT "_VisaRequirementToVisaType_B_fkey" FOREIGN KEY ("B") REFERENCES "visa_type"("id") ON DELETE CASCADE ON UPDATE CASCADE;
