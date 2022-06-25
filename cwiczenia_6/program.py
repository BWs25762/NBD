import riak
from riak.riak_object import RiakObject
import argparse
import json


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("-d", "--document", type=json.loads, default={}, required=False)
    parser.add_argument("-k", "--key", type=str, default=None, required=False)
    parser.add_argument("-e", "--edit", type=json.loads, default={"extra_field":1}, required=False)
    parser.add_argument("-b", "--bucket", type=str, default="main_bucket", required=False)

    args = parser.parse_args()

    with open("komunikaty.txt", "w") as f:
        f.write("ARGS:\n")
        for arg, value in vars(args).items():
            f.write(arg + "=" + str(value) + "\n")
        f.write("\n")
        key = args.key

        client = riak.RiakClient(http_port=8098, protocol='http', host='127.0.0.1')
        bucket = client.bucket(args.bucket)

        obj = RiakObject(client, bucket, key=key)
        obj.content_type = 'application/json'
        obj.data = args.document

        saved_obj = obj.store(return_body=True)
        key = saved_obj.key
        
        f.write("pobranie przed modyfikacja:\n")
        retrieved_obj = bucket.get(key)
        f.write(str(retrieved_obj.data) + "\n")
        f.write(str(retrieved_obj.__dict__) + "\n")

        for edit_key, edit_value in args.edit.items():
            retrieved_obj.data[edit_key] = edit_value
        
        retrieved_obj.store(return_body=True)

        f.write("\npobranie po modyfikacji:\n")
        retrieved_obj = bucket.get(key)
        f.write(str(retrieved_obj.data) + "\n")
        f.write(str(retrieved_obj.__dict__) + "\n")

        bucket.delete(key)

        f.write("\npobranie po usunieciu:\n")
        retrieved_obj = bucket.get(key)
        f.write(str(retrieved_obj.data) + "\n")
        f.write(str(retrieved_obj.__dict__) + "\n")



if __name__ == "__main__":
    main()