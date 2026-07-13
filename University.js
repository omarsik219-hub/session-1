"""
University Student Portal - Grading System
- Requires attendance ≥ 75% and tuition paid to view results
- Calculates total score from midterm, final, assignments
- Assigns letter grade
- Displays scholarship eligibility (bonus) for outstanding students
"""

class Student:
    # Grade thresholds
    GRADE_THRESHOLDS = [
        (90, 'A', "Excellent"),
        (80, 'B', "Good"),
        (70, 'C', "Average"),
        (60, 'D', "Poor"),
        (0,  'F', "Fail")
    ]
    
    REQUIRED_ATTENDANCE = 75.0  # percentage

    def __init__(self, name, attendance, midterm, final_exam, assignments, tuition_paid):
        self.name = name
        self.attendance = attendance
        self.midterm = midterm
        self.final_exam = final_exam
        self.assignments = assignments
        self.tuition_paid = tuition_paid.lower() in ('yes', 'true', 'paid', 'y')

    def calculate_total(self):
        # Assuming weights: midterm 30%, final 40%, assignments 30%
        total = self.midterm * 0.30 + self.final_exam * 0.40 + self.assignments * 0.30
        return total

    def get_grade(self, score):
        for threshold, grade, _ in self.GRADE_THRESHOLDS:
            if score >= threshold:
                return grade
        return 'F'  # fallback

    def get_performance(self, score):
        for threshold, _, desc in self.GRADE_THRESHOLDS:
            if score >= threshold:
                return desc
        return "Fail"

    def is_scholarship_eligible(self, score):
        # Bonus: outstanding students (grade A and score ≥ 95)
        return score >= 95 and self.tuition_paid

    def display_results(self):
        if self.attendance < self.REQUIRED_ATTENDANCE:
            print(f"{self.name} fails due to low attendance ({self.attendance}% < {self.REQUIRED_ATTENDANCE}%).")
            return
        
        if not self.tuition_paid:
            print("Cannot view results: Tuition not paid.")
            return
        
        total = self.calculate_total()
        grade = self.get_grade(total)
        performance = self.get_performance(total)
        
        print("\n" + "="*40)
        print(f"Student: {self.name}")
        print(f"Attendance: {self.attendance}% (required {self.REQUIRED_ATTENDANCE}%)")
        print(f"Total Score: {total:.2f}")
        print(f"Letter Grade: {grade}")
        print(f"Academic Status: {performance}")
        
        if self.is_scholarship_eligible(total):
            print("🎓 SCHOLARSHIP ELIGIBLE! Outstanding performance.")
        else:
            print("Not eligible for scholarship at this time.")
        print("="*40)

def main():
    print("University Student Portal")
    name = input("Student name: ")
    attendance = float(input("Attendance percentage (0-100): "))
    midterm = float(input("Midterm score (0-100): "))
    final_exam = float(input("Final exam score (0-100): "))
    assignments = float(input("Assignment score (0-100): "))
    tuition = input("Tuition paid? (yes/no): ")
    
    student = Student(name, attendance, midterm, final_exam, assignments, tuition)
    student.display_results()

if __name__ == "__main__":
    main()