-- CreateTable
CREATE TABLE "User" (
    "user_id" SERIAL NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "Task" (
    "task_id" TEXT NOT NULL,
    "task_name" TEXT NOT NULL,
    "userUser_id" INTEGER,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("task_id")
);

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_userUser_id_fkey" FOREIGN KEY ("userUser_id") REFERENCES "User"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;
