-- CreateTable
CREATE TABLE "PortfolioItem" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "description" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "homeImageId" INTEGER NOT NULL,
    "primaryImageId" INTEGER NOT NULL,
    CONSTRAINT "PortfolioItem_homeImageId_fkey" FOREIGN KEY ("homeImageId") REFERENCES "Image" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PortfolioItem_primaryImageId_fkey" FOREIGN KEY ("primaryImageId") REFERENCES "Image" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Link" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "isInternal" BOOLEAN NOT NULL,
    "label" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "linkTypeId" INTEGER NOT NULL,
    CONSTRAINT "Link_linkTypeId_fkey" FOREIGN KEY ("linkTypeId") REFERENCES "LinkType" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "LinkType" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Image" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "url" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Category" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Product" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_PortfolioItemToProduct" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_PortfolioItemToProduct_A_fkey" FOREIGN KEY ("A") REFERENCES "PortfolioItem" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_PortfolioItemToProduct_B_fkey" FOREIGN KEY ("B") REFERENCES "Product" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_LinkToPortfolioItem" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_LinkToPortfolioItem_A_fkey" FOREIGN KEY ("A") REFERENCES "Link" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_LinkToPortfolioItem_B_fkey" FOREIGN KEY ("B") REFERENCES "PortfolioItem" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_ImageToPortfolioItem" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_ImageToPortfolioItem_A_fkey" FOREIGN KEY ("A") REFERENCES "Image" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_ImageToPortfolioItem_B_fkey" FOREIGN KEY ("B") REFERENCES "PortfolioItem" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_CategoryToPortfolioItem" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_CategoryToPortfolioItem_A_fkey" FOREIGN KEY ("A") REFERENCES "Category" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_CategoryToPortfolioItem_B_fkey" FOREIGN KEY ("B") REFERENCES "PortfolioItem" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "PortfolioItem_projectId_key" ON "PortfolioItem"("projectId");

-- CreateIndex
CREATE UNIQUE INDEX "PortfolioItem_name_key" ON "PortfolioItem"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Link_url_key" ON "Link"("url");

-- CreateIndex
CREATE UNIQUE INDEX "LinkType_name_key" ON "LinkType"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Image_url_key" ON "Image"("url");

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Product_name_key" ON "Product"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_PortfolioItemToProduct_AB_unique" ON "_PortfolioItemToProduct"("A", "B");

-- CreateIndex
CREATE INDEX "_PortfolioItemToProduct_B_index" ON "_PortfolioItemToProduct"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_LinkToPortfolioItem_AB_unique" ON "_LinkToPortfolioItem"("A", "B");

-- CreateIndex
CREATE INDEX "_LinkToPortfolioItem_B_index" ON "_LinkToPortfolioItem"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ImageToPortfolioItem_AB_unique" ON "_ImageToPortfolioItem"("A", "B");

-- CreateIndex
CREATE INDEX "_ImageToPortfolioItem_B_index" ON "_ImageToPortfolioItem"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CategoryToPortfolioItem_AB_unique" ON "_CategoryToPortfolioItem"("A", "B");

-- CreateIndex
CREATE INDEX "_CategoryToPortfolioItem_B_index" ON "_CategoryToPortfolioItem"("B");
