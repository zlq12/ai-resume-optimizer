CREATE TABLE "resumes" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "target_role" TEXT,
    "content" TEXT NOT NULL,
    "optimized_content" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "resumes_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "resume_optimizations" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "resume_id" TEXT NOT NULL,
    "input" TEXT NOT NULL,
    "output" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "resume_optimizations_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "resume_monthly_usages" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "month_start" TIMESTAMP(3) NOT NULL,
    "optimization_count" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "resume_monthly_usages_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "resumes_user_id_idx" ON "resumes"("user_id");
CREATE INDEX "resume_optimizations_user_id_created_at_idx" ON "resume_optimizations"("user_id", "created_at");
CREATE INDEX "resume_optimizations_resume_id_idx" ON "resume_optimizations"("resume_id");
CREATE UNIQUE INDEX "resume_monthly_usages_user_id_month_start_key" ON "resume_monthly_usages"("user_id", "month_start");

ALTER TABLE "resumes" ADD CONSTRAINT "resumes_user_id_fkey"
  FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "resume_optimizations" ADD CONSTRAINT "resume_optimizations_user_id_fkey"
  FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "resume_optimizations" ADD CONSTRAINT "resume_optimizations_resume_id_fkey"
  FOREIGN KEY ("resume_id") REFERENCES "resumes"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "resume_monthly_usages" ADD CONSTRAINT "resume_monthly_usages_user_id_fkey"
  FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
