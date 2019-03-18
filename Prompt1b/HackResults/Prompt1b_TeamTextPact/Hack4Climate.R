#Hack4Climate, Dodi, Yen Ching, Amberly


commitments <- read.csv("hack4climate_commitments_070319.csv", stringsAsFactors = FALSE,na.strings=c(""))

SEAcountries <- c("Malaysia","Singapore","Indonesia","Thailand","Philippines","Cambodia",
                  "Laos","Myanmar","Brunei","Vietnam")

SEA <- commitments[which(commitments$country %in% SEAcountries),]
SEA[1,]$raw_commitment
write.csv(SEA,"SEA_new.csv")

sum(commitments$country == "Singapore")
sum(commitments$country == "Malaysia")
sum(commitments$country == "Thailand")
sum(commitments$country == "Indonesia")
sum(commitments$country == "Philippines") #data ends here
sum(commitments$country == "Cambodia") #0
sum(commitments$country == "Laos") #0
sum(commitments$country == "Myanmar") #0
sum(commitments$country == "Brunei") #0
sum(commitments$country == "Vietnam") #0


unique(commitments$region)


#Remove columns; clean data
SEA[,6:13] <- NULL
SEA[,8] <- NULL
SEA$global_list <- NULL
SEA[,12:14]<- NULL
SEA$estimated_tonnes_reduced<-NULL
SEA$notes_on_target<-NULL
SEA$renewable_percent_target<-NULL
SEA$reporting_year<-NULL
write.csv(SEA,"SEA_clean.csv")

SEA <- read.csv("SEA_clean.csv", stringsAsFactors = FALSE)

unique(SEA$baseline_emissions, na.rm=TRUE)
sum(SEA$target_year_emissions[SEA$country=="Philippines"], na.rm = TRUE)



#### New Data
new <- read.csv("City_Region_Data_Commitment_Detail_Streamlined.csv", stringsAsFactors = FALSE)
SEAsiancountries <- c("Malaysia","Singapore","Indonesia","Thailand","Philippines","Cambodia",
                  "Laos","Myanmar","Brunei","Vietnam")

SEA1 <- new[which(new$country %in% SEAsiancountries),]
write.csv(SEA1,"sea21data.csv")

a <- read.csv("Regression.csv", stringsAsFactors = FALSE)
plot(jitter(as.numeric(a$Percentage.reduction),1.5)~jitter(as.numeric(a$X..of.city.actions),1.5),
     xlab = "Number of city actions", ylab = "Percentage reduction goal", 
     main = "Plot of Percentage Reduction Goal against Number of City Action",
     col = "darkred", bg = "pink", cex = 1.2, pch = 21)
lrm1 <- lm(a$Percentage.reduction~a$X..of.city.actions)
abline(lrm1, lwd = 3)
lrm1$coefficients
#(Intercept) a$X..of.city.actions 
#28.987598            -2.271507 
cor(a$Percentage.reduction,a$X..of.city.actions)
#-0.1358172
summary(lrm1)
#R-squared: 0.01845, p value = 0.5572
#Not the number of actions but what the action does; ambitious action; more effective than many
#Small actions. Not much relationship; approaches more broad
#Production against based year
#greenhouse gas emission target; subcommitment telling how to reach (not many),
#focus on specific sectors; or not much detail in data set
library(ggplot2)

ggplot(a, aes(a$X..of.city.actions, y = a$Percentage.reduction)) + geom_point() + theme_bw() + stat_smooth(method="lm") + ggtitle("Plot of Percentage Reduction Goal against Number of City Action") + xlab("Number of city actions") + ylab("Percentage reduction goal")  
                                                                                                           
######################

a$Baseline[a$City=="Jakarta"] <- NA
plot(jitter(as.numeric(a$Baseline),1.5)~jitter(as.numeric(a$X..of.city.actions),1.5),
     xlab = "Number of city actions", ylab = "Percentage reduction goal", 
     main = "Plot of Percentage Reduction Goal against Number of City Action",
     col = "darkred", bg = "pink", cex = 1.2, pch = 21)
lrm2 <- lm(a$Baseline~a$X..of.city.actions)
abline(lrm2, lwd = 3)
lrm2$coefficients
#(Intercept) a$X..of.city.actions 
#1074102.30            -41447.97 
summary(lrm2)
