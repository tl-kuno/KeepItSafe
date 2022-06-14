import time

# example 1
f = open('communication_pipe.txt', 'w')
f.truncate()
f.write('#facbook\nGmail\nWells Fargo\nGitHub\nFacebook\nDiscord\nPintrest\nMountain Project')
f.close()

time.sleep(2)

f = open('communication_pipe.txt', 'r')
all_suggestions = f.read()
suggestions_list = all_suggestions.split('\n')
print(suggestions_list)
f.close()

time.sleep(2)

f = open('communication_pipe.txt', 'r')
all_suggestions = f.read()
suggestions_list = all_suggestions.split('\n')
print(suggestions_list)
f.close()


# example 3
f = open('communication_pipe.txt', 'w')
f.truncate()
f.write('#fugle\nGoogle\nEbay\nAmazon\nOregonState\nSpotify\nFidelity\nChase\nJira\nGmail\nReddit\nWells Fargo')
f.close()

time.sleep(2)

f = open('communication_pipe.txt', 'r')
all_suggestions = f.read()
suggestions_list = all_suggestions.split('\n')
print(suggestions_list)
f.close()