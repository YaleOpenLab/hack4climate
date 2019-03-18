from selenium import webdriver
import time

browser=webdriver.Firefox()



months=range(10,13)
dateSelectorXpath='/html/body/div[1]/div[7]/section[2]/div[5]/div[1]/select/option[{}]'
d={1:31,
    2:28,
    3:31,
    4:30,
    5:31,
    6:30,
    7:31,
    8:31,
    9:30,
    10:31,
    11:30,
    12:31    
}
# browser.find_element_by_xpath('//*[@id="wt-his-select"]').click()

# option=browser.find_element_by_xpath(dateSelectorXpath.format(10))
# option.click()
# time.sleep(1)

for month in months:
    url='https://www.timeanddate.com/weather/usa/baltimore/historic?month={}&year=2017'
    browser.get(url.format(month))
    time.sleep(3)
    for day in range(1,d[month]+1):
        browser.find_element_by_xpath('//*[@id="wt-his-select"]').click()
        option=browser.find_element_by_xpath(dateSelectorXpath.format(day))
        option.click()
        time.sleep(1)
        with open('htmlPages/'+'{}-{}'.format(month,day)+'.html', 'w') as f: f.write(browser.page_source)
    