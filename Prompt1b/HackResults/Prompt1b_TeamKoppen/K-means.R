library(ggplot2)
library(Biobase)
library(knitr)
dat <- read.csv("data_3pm.csv")
dat$Population <- gsub(",", "", dat$Population)
dat$Population <- as.numeric(dat$Population)
nrow(dat)

dat1 <- dat[c(6,11)]
head(dat1)
sum(dat1$Population < 150000)

dat1$pop <- character(length(dat1$Population))
for (i in seq_len(length(dat1$pop))) {
  if (dat$Population[i] <= 150000) {
    dat1$pop[i] <- "xs"
  } else if (dat$Population[i] <= 350000) {
    dat1$pop[i] <- "s"
  } else if (dat$Population[i] <= 750000) {
    dat1$pop[i] <- "m"
  } else if (dat$Population[i] <= 1500000) {
    dat1$pop[i] <- "l"
  } else {
    dat1$pop[i] <- "xl"
  }
}

#dat1$koppenval <- as.numeric(dat1$koppen)
#dat1$popscaled <- scale(dat1$Population)
dat2 <- dat1[c(2,3)]
dat2 <- as.matrix(dat2)
dat3 <- dat1[c(2,3)]
dat3$koppen <- factor(dat3$koppen)
dat3$pop <- factor(dat3$pop)
dat3$pop


wss <- numeric(15)
for (k in 1:15) {
  wss[k] <- sum(kmeans(dat1, centers = k, nstart = 25)$withinss)
}

plot(1:15, wss, type = "b", xlab = "Number of clusters", ylab = "Within Sum of Squares")

install.packages("klaR")
install.packages("MASS")
library(klaR)


cl <- kmodes(dat2, 5, iter.max = 10, weighted = FALSE, fast = TRUE)
dat3$cluster <- factor(cl$cluster) 
dat3$cluster
dat3$koppen

pdf_name <- "cluster.pdf"
pdf(file = pdf_name, width = 7, height = 5)
ggplot(data = dat3,
       aes(x = pop, y = koppen, color = cluster)) + 
  geom_point(size = 5) + 
  labs(title = "K-mode clustering",
       x = "Population Classfications",
       y = "Koppen")
dev.off()
openPDF(pdf_name)

dat$cluster <- cl$cluster
write.csv(dat,
          file = "withclusters.csv")
