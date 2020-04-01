import pymysql


class DatabaseClient:
    def __init__(self):
        self.db = pymysql.connect("localhost", "root", "root", "webtest",port=3307)

    def addData(self, tableNmae, tableData):

        self.db.sql()

    def insert(self, tableName, tableCol, tableRow):
        db = self.db
        cursor = db.cursor()
        # SQL 插入语句
        tableCol = ",".join(tableCol)
        tableRow = "','".join(tableRow)
        sql = f"INSERT INTO {tableName}({tableCol}) VALUES ('{tableRow}')"
        print(sql)
        try:
            # 执行sql语句
            cursor.execute(sql)
            # 执行sql语句
            db.commit()
            return True
        except:
            # 发生错误时回滚
            print("error")
            db.rollback()
            return False

    def update(self, tableName, tableCol, tableRow):
        db = self.db
        cursor = db.cursor()
        # SQL 插入语句
        tableCol = ",".join(tableCol)
        tableRow = "','".join(tableRow)

        sql = f"UPDATE {tableName}({tableCol}) VALUES ('{tableRow}')"
        print(sql)
        try:
            # 执行sql语句
            cursor.execute(sql)
            # 执行sql语句
            db.commit()
            return True
        except:
            # 发生错误时回滚
            print("error")
            db.rollback()
            return False

    def sql(self, sql):
        cursor = self.db.cursor()
        try:
            # 执行SQL语句
            cursor.execute(sql)
            # 获取所有记录列表
            results = cursor.fetchall()
            return results
            # print(results)
            # for row in results:
            #     fname = row[0]
            #     lname = row[1]
            #     age = row[2]
            #     sex = row[3]
            #     income = row[4]
            #     return ("fname=%s,lname=%s,age=%s,sex=%s,income=%s" % \
            #             (fname, lname, age, sex, income ))
        except:
            return False
            print("Error: unable to fetch data")

# db = DB()
# db.sql("SELECT * FROM items")
# db.insert(f'items','name,target,description,endtime',"'test','127.0.0.1','nothing','1'")
