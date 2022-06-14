import difflib

# create communication_pipe.txt if it doesn't exist
f = open('C:/OSU/Term5/CS361_SE/KeepItSafe/keep-it-safe/communication_pipe.txt', 'w+')
f.close()

while True:
    f = open('C:/OSU/Term5/CS361_SE/KeepItSafe/keep-it-safe/communication_pipe.txt', 'r+')
    input_string = f.readline()
    if input_string != '' and input_string[0] == '#':  # signal to read
        # populate the words_bank
        words_bank_from_user = f.read()
        words_bank = words_bank_from_user.split('\n')

        # call difflib
        suggestions = difflib.get_close_matches(input_string[1: -1], words_bank, n=3, cutoff=0.5)   # exclude the leading # and the tailing \n

        # erase all existing content
        f.seek(0)
        f.truncate()

        # write suggestions in communication_pipe.txt
        for i in range(len(suggestions)):
            f.write(suggestions[i])
            if i != len(suggestions) - 1:
                f.write('\n')
    f.close()
